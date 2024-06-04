import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema({
  text: {
    type: String,
  },
  katexEquation: {
    type: String,
  },
  options: {
    type: [String],
    required: true,
  },
  correctOptionIndex: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
});

// Schema for Exam
const examSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  module: {
    name: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
  },
  rules: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  scheduledDate: {
    type: Date,
  },
  duration: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// Schema for Exam Attempt
const examAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  answers: [
    {
      questionId: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      selectedOptionIndex: {
        type: Number,
        required: true,
      },
    },
  ],
  incorrectQuestions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  score: {
    type: Number,
  },
  status: {
    type: String,
    default: "incomplete",
  },
});

// Schema for Payment
const ExamPaymentSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  signature: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
});

const Exam = mongoose.model("Exam", examSchema);
const ExamPayment = mongoose.model("ExamPayment", ExamPaymentSchema);
const ExamAttempt = mongoose.model("ExamAttempt", examAttemptSchema);

export { Exam, ExamPayment, ExamAttempt };
