import { Exam, ExamAttempt, ExamPayment } from "../models/examModel.js";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import { ErrorHandler, handleError } from "../utils/ErrorHandler.js";
import User from "../models/userModel.js";
import crypto from "crypto";
import instance from "../middleware/instance.js"
import ExcelJS from 'exceljs';
// Create a new exam
export const createExam = CatchAsyncError(async (req, res, next) => {
    try {
        const { name, module, price, scheduledDate, duration, rules, description, image } = req.body;
        const { id } = req.user;
        if (price < 0) {
            throw new ErrorHandler('Price cannot be negative', 400);
        }
        if (duration < 0) {
            throw new ErrorHandler('Duration cannot be negative', 400);
        }
        if (duration < 1) {
            throw new ErrorHandler('Duration must be atleast 1 minute', 400);
        }

        const date = new Date(scheduledDate);
        if (date < new Date()) {
            throw new ErrorHandler('Scheduled date must be in the future', 400);
        }
        const exam = await Exam.create({
            name,
            module,
            price,
            scheduledDate: date,
            duration,
            createdBy: id,
            rules,
            description,
            image
        });
        if (!exam) {
            throw new ErrorHandler('Exam creation failed', 500);
        }
        res.status(201).json({
            success: true,
            message: "Exam created successfully",
            exam
        });
    } catch (error) {
        handleError(error, res);
    }
});

// Get all exams with pagination and search filter
export const getAllExams = CatchAsyncError(async (req, res, next) => {
    try {
        const { page = 1, limit = 10, keyword = "" } = req.query;
        const skip = (page - 1) * limit;
        const regex = new RegExp(keyword, "i");

        const [exams, count] = await Promise.all([
            Exam.find({ name: { $regex: regex } })
                .limit(limit)
                .skip(skip)
                .exec(),
            Exam.countDocuments({ name: { $regex: regex } }),
        ]);

        res.status(200).json({
            success: true,
            exams,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            totalCount: count,
        });
    } catch (error) {
        handleError(error, res);
    }
});


// Get single exam details
export const getSingleExam = CatchAsyncError(async (req, res, next) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            throw new ErrorHandler("Exam not found", 404);
        }
        // Shuffle the questions
        exam.module.questions = exam.module.questions.sort(() => Math.random() - 0.5);
        if (!exam) {
            throw new ErrorHandler("Exam not found", 404);
        }
        res.status(200).json({
            success: true,
            exam
        });
    } catch (error) {
        handleError(error, res);
    }
});

export const updateExam = CatchAsyncError(async (req, res, next) => {
    try {
        const { name, module, price, scheduledDate, duration, rules, description, image } = req.body;
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            throw new ErrorHandler("Exam not found", 404);
        }

        // Update exam details
        if (name) exam.name = name;
        if (module) exam.module = module;
        if (price) exam.price = price;
        if (scheduledDate) exam.scheduledDate = new Date(scheduledDate);
        if (duration) exam.duration = duration;
        if (rules) exam.rules = rules;
        if (description) exam.description = description;
        if (image) exam.image = image;

        // Save the updated exam
        await exam.save();
        res.status(200).json({
            success: true,
            message: "Exam updated successfully",
            exam
        });
    } catch (error) {
        handleError(error, res);
    }
});



// Delete exam
export const deleteExam = CatchAsyncError(async (req, res, next) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) {
            throw new ErrorHandler("Exam not found", 404);
        }

        // Delete From User's Enrolled Exams
        const users = await User.find({ 'examsEnrolled.exam': req.params.id });
        users.forEach(async (user) => {
            user.examsEnrolled = user.examsEnrolled.filter(exam => exam.exam.toString() !== req.params.id);
            await user.save();
        });
        // Delete From Exam Attempts
        await ExamAttempt.deleteMany({ exam: req.params.id });
        // Delete From Exam Payments if any
        await ExamPayment.deleteMany({ exam: req.params.id });

        // Delete the exam

        await exam.deleteOne();

        res.status(200).json({
            success: true,
            message: "Exam deleted successfully"
        });
    } catch (error) {
        handleError(error, res);
    }
});

// createRazorpayOrder
export const createRazorpayOrder = async (req, res) => {
    try {
        const { amount, currency, examId } = req.body;
        const options = {
            amount: amount * 100,
            currency,
            receipt: `exam_${examId}`,
        };
        const razorpayOrder = await instance.orders.create(options);
        const examPayment = await ExamPayment.create({
            exam: examId,
            user: req.user.id,
            amount: amount,
            paymentId: razorpayOrder.id,
            orderId: razorpayOrder.id,
            signature: razorpayOrder.id,
            status: 'pending'
        });
        const user = await User.findById(req.user.id);
        if (user.role !== 'student') {
            throw new ErrorHandler('Only students can enroll for exams', 400);
        }

        // Return the order and payment details
        res.status(200).json({
            success: true,
            razorpayOrder,
            examPayment
        });
    } catch (error) {
        handleError(error, res);
    }
};

// verifyPayment
export const verifyPayment = async (req, res) => {
    try {
        const { orderId, paymentId, signature } = req.body;
        const hmac = crypto.createHmac('sha256',
            process.env.RAZORPAY_API_SECRET
        );
        hmac.update(`${orderId}|${paymentId}`);
        const generatedSignature = hmac
            .digest('hex')
            .toString();
        if (generatedSignature === signature) {
            const payment = await ExamPayment.findOne({ orderId });
            if (!payment) {
                throw new ErrorHandler('Payment not found', 404);
            }

            // Update payment status if successful
            payment.status = 'completed';
            await payment.save();

            // If payment is successful, enroll the user in the exam
            const user = await User.findById(payment.user);
            if (user.role !== 'student') {
                throw new ErrorHandler('Only students can enroll for exams', 400);
            }
            const isEnrolled = user.examsEnrolled.find(exam => exam.exam.toString() === payment.exam.toString());
            if (isEnrolled) {
                throw new ErrorHandler('You are already enrolled in this exam', 400);
            }
            user.examsEnrolled.push({
                exam: payment.exam,
                status: 'enrolled'
            });
            await user.save();
            res.json({ success: true });

        } else {
            res.json({ success: false });
        }
    }
    catch (error) {
        handleError(error, res);
    }
};

// Enroll For Free Exam
export const enrollForExam = CatchAsyncError(async (req, res, next) => {
    try {
        const { examId } = req.body;
        const { id: userId } = req.user;
        const user = await User.findById(userId);
        if (user.role !== 'student') {
            throw new ErrorHandler('Only students can enroll for exams', 400);
        }
        const isEnrolled = user.examsEnrolled.find(exam => exam.exam.toString() === examId);
        if (isEnrolled) {
            throw new ErrorHandler('You are already enrolled in this exam', 400);
        }
        user.examsEnrolled.push({
            exam: examId,
            status: 'enrolled'
        });
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Enrolled successfully'
        });
    } catch (error) {
        handleError(error, res);
    }
});
// Start Exam Attempt
export const startExamAttempt = CatchAsyncError(async (req, res, next) => {
    try {
        const { id: examId } = req.params;
        const { id: userId } = req.user;
        const user = await User.findById(userId);
        const isEnrolled = user.examsEnrolled.find(exam => exam?.exam?.toString() === examId);
        if (!isEnrolled) {
            throw new ErrorHandler('You are not enrolled in this exam', 400);
        }
        const attempt = await ExamAttempt.findOne({ exam: examId, user: userId });
        if (attempt) {
            throw new ErrorHandler('You have already enrolled in this exam', 400);
        }
        const examAttempt = await ExamAttempt.create({
            exam: examId,
            user: userId,
            answers: [],
            score: 0,
            status: 'incomplete'
        });
        res.status(201).json({
            success: true,
            examAttempt,
            message: 'Exam attempt started successfully'
        });
    }
    catch (error) {
        handleError(error, res);
    }
});

// Submit Exam Attempt
export const submitExamAttempt = CatchAsyncError(async (req, res, next) => {
    try {
        const { id: examId } = req.params;
        const { id: userId } = req.user;
        const { answers } = req.body;
        // Find the exam attempt
        const attempt = await ExamAttempt.findOne({ exam: examId, user: userId });

        if (!attempt) {
            throw new ErrorHandler('Attempt not found', 404);
        }

        if (attempt.status === 'completed') {
            throw new ErrorHandler('Attempt already completed', 400);
        }

        // Fetch the exam
        const exam = await Exam.findById(examId);
        if (!exam) {
            throw new ErrorHandler('Exam not found', 404);
        }

        let score = 0;
        const incorrectQuestions = [];
        // Validate and calculate score for each answer
        for (let i = 0; i < answers.length; i++) {
            const answer = answers[i];
            const question = exam.module.questions.find(q => q._id.toString() === answer.questionId);
            if (!question) {
                throw new ErrorHandler('Question not found', 404);
            }
            if (question.correctOptionIndex === answer.selectedOptionIndex) {
                score += 1;
            }
            else {
                incorrectQuestions.push(question._id);
            }
        }

        // Update the attempt
        attempt.score = score;
        attempt.answers = answers;
        attempt.incorrectQuestions = incorrectQuestions;

        // Mark the attempt as completed
        attempt.status = 'completed';

        // End Time
        attempt.endTime = new Date();

        // Update the user's exam status
        const user = await User.findById(userId);
        const enrolledExam = user.examsEnrolled.find(exam => exam.exam.toString() === examId);
        enrolledExam.status = 'completed';
        await user.save();

        //  If the user attempted the exams successfully at it to the participants in the exam
        exam.participants.push(userId);
        await exam.save();
        // Calculate stats
        const totalQuestions = exam.module.questions.length;
        const percentageScore = (score / totalQuestions) * 100;
        // Time Must be in minutes
        const timeTaken = Math.floor((new Date() - attempt.startTime) / 60000);
        const correctQuestions = totalQuestions - incorrectQuestions.length;
        // Times in minutes
        const timeRemaining = exam.duration - timeTaken;

        // Pass data to next page
        const data = {
            incorrectQuestions,
            performanceStats: {
                totalQuestions,
                score,
                percentageScore,
                timeTaken,
                correctQuestions,
                timeRemaining
            }
        };
        // Save the attempt
        await attempt.save();
        res.status(200).json({
            success: true,
            message: 'Exam attempt submitted successfully',
            data
        });
    } catch (error) {
        console.error(error);
        handleError(error, res);
    }
});

// Getting Result Once the exam is completed
export const getResult = CatchAsyncError(async (req, res, next) => {
    try {
        const { id: examId } = req.params;
        const { id: userId } = req.user;

        // Find the attempt
        const attempt = await ExamAttempt.findOne({ exam: examId, user: userId });
        if (!attempt) {
            throw new ErrorHandler('Attempt not found', 404);
        }

        // Find the exam
        const exam = await Exam.findById(examId);
        if (!exam) {
            throw new ErrorHandler('Exam not found', 404);
        }

        // Validate the questions
        if (!exam.module?.questions?.length) {
            throw new ErrorHandler('Exam questions not found or invalid', 500);
        }

        // Calculate result data
        const totalQuestions = exam.module.questions.length;
        const percentageScore = (attempt.score / totalQuestions) * 100;
        const correctQuestions = totalQuestions - (attempt.incorrectQuestions?.length || 0);
        const timeTaken = Math.floor((attempt.endTime - attempt.startTime) / 60000);
        const timeRemaining = exam.duration - timeTaken;
        // Prepare response data
        const data = {
            incorrectQuestions: attempt.incorrectQuestions || [],
            performanceStats: {
                totalQuestions,
                score: attempt.score,
                percentageScore,
                correctQuestions,
                timeTaken,
                timeRemaining
            }
        };

        res.status(200).json({
            success: true,
            data
        });
    } catch (error) {
        handleError(error, res);
    }
});

// Fetch top 10 exam attempts sorted by score
export const getTop10Scores = CatchAsyncError(async (req, res, next) => {
    try {
        const examId = req.params.id; // Exam ID
        const attempts = await ExamAttempt.find({ exam: examId })
            .populate({
                path: 'user',
                select: 'username fullname'
            })
            .sort({ score: -1 })
            .limit(10);

        // Extracting required data for response
        const topScores = attempts.map(attempt => ({
            username: attempt.user.username,
            score: attempt.score,
            fullname: attempt.user.fullname
        }));

        res.status(200).json({
            success: true,
            topScores: topScores
        });
    } catch (error) {
        handleError(error, res);
    }
});





// Get all exam attempts
export const getAllExamAttempts = CatchAsyncError(async (req, res, next) => {
    try {
        const attempts = await ExamAttempt.find().populate('user');
        res.status(200).json({
            success: true,
            attempts
        });
    } catch (error) {
        handleError(error, res);
    }
});


// Generate report for exam attempts in excel for a specific exam

export const generateExamReport = CatchAsyncError(async (req, res, next) => {
    try {
        const examId = req.params.id;
        const attempts = await ExamAttempt.find({ exam: examId }).populate('user');
        if (!attempts.length) {
            throw new ErrorHandler('No attempts found for the exam', 404);
        }
        const exam = await Exam.findById(examId);
        if (!exam) {
            throw new ErrorHandler('Exam not found', 404);
        }
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Exam Report');
        worksheet.columns = [
            { header: 'Username', key: 'username', width: 20 },
            { header: 'Full Name', key: 'fullname', width: 20 },
            { header: 'Score', key: 'score', width: 10 },
            { header: 'Percentage', key: 'percentage', width: 10 },
            { header: 'Time Taken (minutes)', key: 'timeTaken', width: 20 },
            { header: 'Time Remaining (minutes)', key: 'timeRemaining', width: 20 },
        ];
        attempts.forEach(attempt => {
            const totalQuestions = exam.module.questions.length;
            const percentageScore = (attempt.score / totalQuestions) * 100;
            const timeTaken = Math.floor((attempt.endTime - attempt.startTime) / 60000);
            const timeRemaining = exam.duration - timeTaken;
            worksheet.addRow({
                username: attempt.user.username,
                fullname: attempt.user.fullname,
                score: attempt.score,
                percentage: percentageScore,
                timeTaken,
                timeRemaining
            });
        });
        const fileName = `exam_report_${examId}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        handleError(error, res);
    }
});

