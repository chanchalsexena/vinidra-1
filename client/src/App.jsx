import { Result, Login, Register, PageNotFound, Home, Header, Footer, VerifyEmail, Loader, ForgetPassword, ResetPassword, Contact, Request, About, Profile, UpdateProfile, ChangePassword, Course, CourseDetails as CoursePage, Subscribe, PaymentFailed, PaymentSuccess, DashBoard, CreateAdmin, GetAllAdmins, GetAllUsers, AddTeacher, AddUser, GetAllTeachers, Exams, ExamPaymentFailure, ExamPaymentSuccessful, ExamDetails, ExamPage, ExamQuestionPage, SendMail, ExamDashBoard, ViewResults, AdminHome, CreateExam, GetAllExams, } from "./index";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import { loadUser } from "./store/action/userAction";
import { ProtectedRoute } from "protected-route-react"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllExams } from "./store/action/examAction";
import { getHomeData } from "./store/action/homeAction";
import toast from "react-hot-toast";
import PageTitle from "./PageTitle";
const App = () => {

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });
  document.onkeydown = function (e) {
    if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)) {
      return false;
    }
    if (e.keyCode === 123) {
      return false;
    }
  };
  document.addEventListener('keydown', function (e) {
    if (e.ctrlKey && (e.key === 'i' || e.key === 'I')) {
      e.preventDefault();
    }
  });


  const { isAuthenticated, user, loading, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, message, isAuthenticated]);
  useEffect(() => {
    dispatch(loadUser());
    dispatch(getAllExams())
    dispatch(getHomeData());
  }, [dispatch]);
  return (
    <>
      <Router>
        {
          loading ? <Loader /> : (
            <>
              <Header user={user} isAuthenticated={isAuthenticated} />
              <PageTitle title={"Home"} />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/courses" element={<Course />} />
                <Route path="/forget-password" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"> <ForgetPassword /></ProtectedRoute>} />
                <Route path="/resetpassword/:token" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"> <ResetPassword /></ProtectedRoute>} />
                <Route path="/request" element={<Request />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile user={user} /></ProtectedRoute>} />
                <Route path="/login" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"><Login /></ProtectedRoute>} />
                <Route path="/register" element={<ProtectedRoute isAuthenticated={!isAuthenticated} redirect="/profile"><Register /></ProtectedRoute>} />
                <Route path="/updateprofile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdateProfile user={user} /></ProtectedRoute>} />
                <Route path="/changepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangePassword /></ProtectedRoute>} />
                <Route path="/course/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><CoursePage user={user} /></ProtectedRoute>} />
                <Route path="/subscribe" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subscribe user={user} /></ProtectedRoute>} />
                <Route path="/paymentsuccess" element={<PaymentSuccess />} />
                <Route path="/paymentfailed" element={<PaymentFailed />} />
                <Route path="/exams" element={<Exams />} />
                <Route path="/exampaymentsuccess" element={<ExamPaymentSuccessful />} />
                <Route path="/exampaymentfailure" element={<ExamPaymentFailure />} />
                <Route path="/exam/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ExamDetails user={user} /></ProtectedRoute>} />
                <Route path="/start/exam/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ExamPage /></ProtectedRoute>} />
                <Route path="/attempt/:id/" element={<ExamQuestionPage />} />
                <Route path="/result" element={<Result />} />
                <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ExamDashBoard /></ProtectedRoute>} />
                <Route path="/view/exam/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><ViewResults /></ProtectedRoute>} />
                {/* Admin Routes */}
                <Route path="/admin/dashboard" redirect="/admin/dashboard" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && (user.role === 'admin' || user.role === "teacher")}><DashBoard /></ProtectedRoute>} />
                <Route path="/admin/add-admin" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} redirect="/admin/add-admin"><CreateAdmin /></ProtectedRoute>} />
                <Route path="/admin/admins" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} redirect="/admin/admins"><GetAllAdmins /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && (user.role === 'admin' || user.role === "teacher")} redirect="/admin/users"><GetAllUsers /></ProtectedRoute>} />
                <Route path="/admin/add-teacher" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} redirect="/admin/add-teacher"><AddTeacher /></ProtectedRoute>} />
                <Route path="/admin/add-user" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && (user.role === 'admin' || user.role === "teacher")} redirect="/admin/add-user"><AddUser /></ProtectedRoute>} />
                <Route path="/admin/teachers" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} redirect="/admin/teachers"><GetAllTeachers /></ProtectedRoute>} />
                <Route path="/admin/send-email" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && (user.role === 'admin' || user.role === "teacher")} redirect="/admin/send-email"><SendMail /></ProtectedRoute>} />
                <Route path="/admin/home" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role === 'admin'} redirect="/admin/home"><AdminHome /></ProtectedRoute>} />
                <Route path="/admin/create-exam" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && (user.role === 'admin' || user.role === "teacher")} redirect="/admin/create-exam"><CreateExam /></ProtectedRoute>} />
                <Route path="/admin/exams" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && (user.role === 'admin' || user.role === "teacher")} redirect="/admin/exams"><GetAllExams /></ProtectedRoute>} />
                {/* <Route path="/admin/faq" element={<ProtectedRoute adminRoute isAuthenticated={isAuthenticated} isAdmin={user && user.role==="admin"} redirect="/admin/faq"><Faq /></ProtectedRoute>} /> */}
              </Routes>
              <Footer />
            </>
          )
        }
      </Router>
    </>
  )
}

export default App

// import { useState, useEffect } from 'react';
// import {
//   Container,
//   Heading,
//   Text,
//   Button,
//   AlertDialog,
//   AlertDialogOverlay,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogBody,
//   AlertDialogFooter,
//   Flex,
//   VStack,
//   Box,
//   Image,
// } from '@chakra-ui/react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { submitExamAttempt, getSingleExam, getTop10Scores } from '../../store/action/examAction';
// import toast from 'react-hot-toast';
// import { FaExpand, FaCompress } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import { GiHamburgerMenu } from 'react-icons/gi';
// import { loadUser } from '../../store/action/userAction';
// import PageTitle from '../../PageTitle';
// import katex from 'katex';

// const ExamQuestionsPage = () => {
//   document.addEventListener('contextmenu', (event) => event.preventDefault());
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { exam, message, error } = useSelector((state) => state.exam);
//   const dispatch = useDispatch();
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(exam ? exam.duration * 60 : 0);
//   const [timerInterval, setTimerInterval] = useState(null);
//   const [isAttemptingToLeave, setIsAttemptingToLeave] = useState(false);
//   const [questionStatus, setQuestionStatus] = useState({});
//   const [isExamSubmitted, setIsExamSubmitted] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
//   const [reviewedQuestions, setReviewedQuestions] = useState({});

//   const onBackButtonEvent = (e) => {
//     e.preventDefault();
//     if (!isAttemptingToLeave) {
//       setShowSubmitConfirmation(true);
//     }
//   };

//   useEffect(() => {
//     window.history.pushState(null, null, window.location.pathname);
//     window.addEventListener('popstate', onBackButtonEvent);
//     return () => {
//       window.removeEventListener('popstate', onBackButtonEvent);
//     };
//   }, [isAttemptingToLeave]);

//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem(`exam_${id}_data`));
//     if (savedData) {
//       setSelectedAnswers(savedData.selectedAnswers);
//       setRemainingTime(savedData.remainingTime);
//     }
//   }, [id]);

//   useEffect(() => {
//     localStorage.setItem(`exam_${id}_data`, JSON.stringify({ selectedAnswers, remainingTime }));
//   }, [selectedAnswers, remainingTime, id]);

//   useEffect(() => {
//     dispatch(getSingleExam(id));
//     if (message) {
//       toast.success(message);
//       dispatch({ type: 'clearMessage' });
//     }
//     if (error) {
//       dispatch({ type: 'clearError' });
//     }
//   }, [dispatch, id, message, error]);

//   useEffect(() => {
//     if (remainingTime > 0) {
//       const interval = setInterval(() => {
//         setRemainingTime((prevTime) => prevTime - 1);
//       }, 1000);
//       setTimerInterval(interval);
//       return () => clearInterval(interval);
//     } else {
//       clearInterval(timerInterval);
//       handleSubmit();
//     }
//   }, [remainingTime]);

//   useEffect(() => {
//     dispatch(getTop10Scores(id));
//   }, [dispatch, id]);

//   useEffect(() => {
//     const handleBeforeUnload = (event) => {
//       if (!isAttemptingToLeave) {
//         event.preventDefault();
//         event.returnValue = '';
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//     };
//   }, [isAttemptingToLeave]);

//   useEffect(() => {
//     const handleEscapeKey = (event) => {
//       event.preventDefault();
//     };

//     const disableCopy = (event) => {
//       event.preventDefault();
//     };

//     if (isExamSubmitted) {
//       document.removeEventListener('keydown', handleEscapeKey);
//       document.removeEventListener('copy', disableCopy);
//     } else {
//       document.addEventListener('keydown', handleEscapeKey);
//       document.addEventListener('copy', disableCopy);
//     }

//     return () => {
//       document.removeEventListener('keydown', handleEscapeKey);
//       document.removeEventListener('copy', disableCopy);
//     };
//   }, [isExamSubmitted]);

//   useEffect(() => {
//     const elem = document.documentElement;
//     if (elem.requestFullscreen) {
//       elem.requestFullscreen();
//     } else if (elem.mozRequestFullScreen) {
//       elem.mozRequestFullScreen();
//     } else if (elem.webkitRequestFullscreen) {
//       elem.webkitRequestFullscreen();
//     } else if (elem.msRequestFullscreen) {
//       elem.msRequestFullscreen();
//     }
//     const handleFullScreenChange = () => {
//       setIsFullScreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullScreenChange);

//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullScreenChange);
//     };
//   }, []);

//   const KatexEquationRenderer = ({ equation }) => {
//     try {
//       return <div dangerouslySetInnerHTML={{ __html: katex.renderToString(equation, { throwOnError: false }) }} />;
//     } catch (error) {
//       console.error('Error rendering KaTeX:', error);
//       return <div>Error rendering equation</div>;
//     }
//   };

//   const handleAnswerSelection = (questionId, selectedOptionIndex) => {
//     setSelectedAnswers({
//       ...selectedAnswers,
//       [questionId]: selectedOptionIndex,
//     });
//     setQuestionStatus({
//       ...questionStatus,
//       [questionId]: true,
//     });
//   };

//   const handleLeaveConfirmation = () => {
//     setShowSubmitConfirmation(true);
//   };

//   const handleSubmit = () => {
//     clearInterval(timerInterval);
//     const formattedAnswers = exam?.module?.questions.map((question) => {
//       const selectedOptionIndex = selectedAnswers[question._id] !== undefined ? selectedAnswers[question._id] : -1;
//       return {
//         questionId: question._id,
//         selectedOptionIndex,
//       };
//     });

//     dispatch(submitExamAttempt(exam?._id, formattedAnswers))
//       .then(() => {
//         setIsExamSubmitted(true);
//         setIsAttemptingToLeave(true);
//         setTimeout(() => {
//           navigate('/dashboard');
//         }, 3000);
//         dispatch(loadUser());
//         dispatch(getTop10Scores(id));
//       })
//       .catch((error) => {
//         setIsAttemptingToLeave(false);
//         toast.error(error.response?.data?.message || 'Failed to submit exam. Please try again.');
//       });
//   };

//   const handleCloseSubmitConfirmation = () => {
//     setShowSubmitConfirmation(false);
//   };

//   const handleConfirmSubmit = () => {
//     setShowSubmitConfirmation(false);
//     setIsAttemptingToLeave(true);
//     handleSubmit();
//   };

//   const handleCancelSubmit = () => {
//     setShowSubmitConfirmation(false);
//     setIsAttemptingToLeave(false);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < exam?.module?.questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => {
//         const nextIndex = prevIndex + 1;
//         setQuestionStatus((prevStatus) => ({
//           ...prevStatus,
//           [exam?.module?.questions[prevIndex]._id]: true,
//         }));
//         return nextIndex;
//       });
//     }
//   };

//   const handlePreviousQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((i) => i - 1);
//     }
//   };

//   const handleQuestionSelection = (index) => {
//     setCurrentQuestionIndex(index);
//     const questionId = exam?.module?.questions[index]._id;
//     setQuestionStatus({
//       ...questionStatus,
//       [questionId]: true,
//     });
//   };

//   const toggleFullScreen = () => {
//     if (!isFullScreen) {
//       const elem = document.documentElement;
//       if (elem.requestFullscreen) {
//         elem.requestFullscreen();
//       } else if (elem.mozRequestFullScreen) {
//         elem.mozRequestFullScreen();
//       } else if (elem.webkitRequestFullscreen) {
//         elem.webkitRequestFullscreen();
//       } else if (elem.msRequestFullscreen) {
//         elem.msRequestFullscreen();
//       }
//     } else {
//       if (document.exitFullscreen) {
//         document.exitFullscreen();
//       } else if (document.mozCancelFullScreen) {
//         document.mozCancelFullScreen();
//       } else if (document.webkitExitFullscreen) {
//         document.webkitExitFullscreen();
//       } else if (document.msExitFullscreen) {
//         document.msExitFullscreen();
//       }
//     }
//     setIsFullScreen(!isFullScreen);
//   };

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <PageTitle title={exam?.module?.name || 'Exam'} />
//       <Container maxW="container.xl" py={8}>
//         <Flex justify="space-between" align="center" mb={6}>
//           <Heading as="h1" size="xl">
//             {exam?.module?.name}
//           </Heading>
//           <Button onClick={toggleSidebar} display={{ base: 'block', md: 'none' }} variant="outline" colorScheme="blue">
//             <GiHamburgerMenu />
//           </Button>
//         </Flex>

//         <Flex>
//           {isSidebarOpen && (
//             <VStack
//               as="aside"
//               w={{ base: 'full', md: '25%' }}
//               spacing={4}
//               bg="gray.100"
//               p={4}
//               borderRadius="md"
//               shadow="md"
//               overflowY="auto"
//               mb={{ base: 4, md: 0 }}
//             >
//               {exam?.module?.questions.map((question, index) => (
//                 <Button
//                   key={question._id}
//                   onClick={() => handleQuestionSelection(index)}
//                   colorScheme={currentQuestionIndex === index ? 'blue' : 'gray'}
//                   size="sm"
//                   variant={questionStatus[question._id] ? 'solid' : 'outline'}
//                   isFullWidth
//                 >
//                   Question {index + 1}
//                 </Button>
//               ))}
//             </VStack>
//           )}

//           <Box flex={1} ml={{ base: 0, md: 8 }}>
//             <Flex justify="space-between" align="center" mb={6}>
//               <Heading as="h2" size="lg">
//                 Question {currentQuestionIndex + 1}
//               </Heading>
//               <Flex>
//                 <Button onClick={toggleFullScreen} mr={4} variant="outline" colorScheme="blue">
//                   {isFullScreen ? <FaCompress /> : <FaExpand />}
//                 </Button>
//                 <Button colorScheme="red" onClick={handleLeaveConfirmation}>
//                   Leave Exam
//                 </Button>
//               </Flex>
//             </Flex>

//             <Box>
//               <Text mb={4}>{exam?.module?.questions[currentQuestionIndex]?.title}</Text>

//               <VStack spacing={4} align="stretch">
//                 {exam?.module?.questions[currentQuestionIndex]?.options.map((option, index) => (
//                   <Button
//                     key={index}
//                     onClick={() => handleAnswerSelection(exam?.module?.questions[currentQuestionIndex]._id, index)}
//                     variant={selectedAnswers[exam?.module?.questions[currentQuestionIndex]?._id] === index ? 'solid' : 'outline'}
//                     colorScheme={selectedAnswers[exam?.module?.questions[currentQuestionIndex]?._id] === index ? 'blue' : 'gray'}
//                   >
//                     {option.text ? option.text : <KatexEquationRenderer equation={option.equation} />}
//                   </Button>
//                 ))}
//               </VStack>
//             </Box>

//             <Flex mt={8} justify="space-between">
//               <Button onClick={handlePreviousQuestion} isDisabled={currentQuestionIndex === 0}>
//                 Previous
//               </Button>
//               <Button onClick={handleNextQuestion} isDisabled={currentQuestionIndex === exam?.module?.questions.length - 1}>
//                 Next
//               </Button>
//             </Flex>
//           </Box>
//         </Flex>

//         <AlertDialog
//           isOpen={showSubmitConfirmation}
//           leastDestructiveRef={undefined}
//           onClose={handleCloseSubmitConfirmation}
//         >
//           <AlertDialogOverlay>
//             <AlertDialogContent>
//               <AlertDialogHeader fontSize="lg" fontWeight="bold">
//                 Submit Exam
//               </AlertDialogHeader>

//               <AlertDialogBody>Are you sure you want to submit your exam? This action cannot be undone.</AlertDialogBody>

//               <AlertDialogFooter>
//                 <Button onClick={handleCancelSubmit}>Cancel</Button>
//                 <Button colorScheme="red" onClick={handleConfirmSubmit} ml={3}>
//                   Submit
//                 </Button>
//               </AlertDialogFooter>
//             </AlertDialogContent>
//           </AlertDialogOverlay>
//         </AlertDialog>
//       </Container>
//     </>
//   );
// };

// export default ExamQuestionsPage;
