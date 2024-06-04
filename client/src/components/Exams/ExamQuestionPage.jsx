import { useState, useEffect } from "react";
import {
  Container,
  Heading,
  Text,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Flex,
  VStack,
  Box,
  Image,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  submitExamAttempt,
  getSingleExam,
} from "../../store/action/examAction";
import toast from "react-hot-toast";
import { getTop10Scores } from "../../store/action/examAction";
import { FaExpand, FaCompress } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { loadUser } from "../../store/action/userAction";
import PageTitle from "../../PageTitle";
import katex from "katex";

const ExamQuestionsPage = () => {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  const { id } = useParams();
  const navigate = useNavigate();
  const { exam, message, error } = useSelector((state) => state.exam);
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showSubmitConfirmation, setShowSubmitConfirmation] = useState(false);
  const [remainingTime, setRemainingTime] = useState(
    exam ? exam.duration * 60 : 0
  );
  const [timerInterval, setTimerInterval] = useState(null);
  const [isAttemptingToLeave, setIsAttemptingToLeave] = useState(false);
  const [questionStatus, setQuestionStatus] = useState({});
  const [isExamSubmitted, setIsExamSubmitted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [reviewedQuestions, setReviewedQuestions] = useState({}); // State for reviewed questions

  useEffect(() => {
    const onBackButtonEvent = (e) => {
      e.preventDefault();
      if (!isAttemptingToLeave) {
        setShowSubmitConfirmation(true);
      }
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => {
      window.removeEventListener("popstate", onBackButtonEvent);
    };
  }, [isAttemptingToLeave]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(`exam_${id}_data`));
    if (savedData) {
      setSelectedAnswers(savedData.selectedAnswers);
      setRemainingTime(savedData.remainingTime);
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(
      `exam_${id}_data`,
      JSON.stringify({ selectedAnswers, remainingTime })
    );
  }, [selectedAnswers, remainingTime, id]);

  useEffect(() => {
    dispatch(getSingleExam(id));
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    if (error) {
      dispatch({ type: "clearError" });
    }
  }, [dispatch, id, message, error]);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
      setTimerInterval(interval);
      return () => clearInterval(interval);
    } else {
      clearInterval(timerInterval);
      handleSubmit();
    }
  }, [remainingTime]);

  useEffect(() => {
    dispatch(getTop10Scores(id));
  }, [dispatch, id]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!isAttemptingToLeave) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isAttemptingToLeave]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      event.preventDefault();
    };

    const disableCopy = (event) => {
      event.preventDefault();
    };

    if (isExamSubmitted) {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("copy", disableCopy);
    } else {
      document.addEventListener("keydown", handleEscapeKey);
      document.addEventListener("copy", disableCopy);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.removeEventListener("copy", disableCopy);
    };
  }, [isExamSubmitted]);

  useEffect(() => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const KatexEquationRenderer = ({ equation }) => {
    try {
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: katex.renderToString(equation, { throwOnError: false }),
          }}
        />
      );
    } catch (error) {
      console.error("Error rendering KaTeX:", error);
      return <div>Error rendering equation</div>;
    }
  };

  const handleAnswerSelection = (questionId, selectedOptionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOptionIndex,
    });
    setQuestionStatus({
      ...questionStatus,
      [questionId]: true,
    });
  };

  const handleLeaveConfirmation = () => {
    setShowSubmitConfirmation(true);
  };

  const handleSubmit = () => {
    clearInterval(timerInterval);
    const formattedAnswers = exam?.module?.questions.map((question) => {
      const selectedOptionIndex =
        selectedAnswers[question._id] !== undefined
          ? selectedAnswers[question._id]
          : -1;
      return {
        questionId: question._id,
        selectedOptionIndex,
      };
    });

    dispatch(submitExamAttempt(exam?._id, formattedAnswers))
      .then(() => {
        setIsExamSubmitted(true);
        setIsAttemptingToLeave(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
        dispatch(loadUser());
        dispatch(getTop10Scores(id));
      })
      .catch((error) => {
        setIsAttemptingToLeave(false);
        toast.error(
          error.response?.data?.message ||
            "Failed to submit exam. Please try again."
        );
      });
  };

  const handleCloseSubmitConfirmation = () => {
    setShowSubmitConfirmation(false);
  };

  const handleConfirmSubmit = () => {
    setShowSubmitConfirmation(false);
    setIsAttemptingToLeave(true);
    handleSubmit();
  };

  const handleCancelSubmit = () => {
    setShowSubmitConfirmation(false);
    setIsAttemptingToLeave(false);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < exam?.module?.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        setQuestionStatus((prevStatus) => ({
          ...prevStatus,
          [exam?.module?.questions[prevIndex]._id]: true,
        }));
        return nextIndex;
      });
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((i) => i - 1);
    }
  };

  const handleQuestionSelection = (index) => {
    setCurrentQuestionIndex(index);
    const questionId = exam?.module?.questions[index]._id;
    setQuestionStatus({
      ...questionStatus,
      [questionId]: true,
    });
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const getCurrentQuestion = () => {
    return exam?.module?.questions[currentQuestionIndex];
  };

  const handleClearSelection = () => {
    const updatedSelectedAnswers = { ...selectedAnswers };
    delete updatedSelectedAnswers[getCurrentQuestion()._id];
    const updatedQuestionStatus = { ...questionStatus };
    delete updatedQuestionStatus[getCurrentQuestion()._id];
    setSelectedAnswers(updatedSelectedAnswers);
    setQuestionStatus(updatedQuestionStatus);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMarkForReview = () => {
    const questionId = getCurrentQuestion()._id;
    setReviewedQuestions((prevState) => ({
      ...prevState,
      [questionId]: !prevState[questionId], // Toggle review status
    }));
  };
  const handleQuestionRender = (questionText) => {
    if (
      questionText &&
      typeof questionText === "string" &&
      questionText.startsWith("\\")
    ) {
      // If the question starts with '\\', it's assumed to be a KaTeX equation
      return <KatexEquationRenderer equation={questionText} />;
    } else {
      // Otherwise, it's rendered as plain text
      return <Text fontSize="lg">{questionText}</Text>;
    }
  };

  const handleOptionRender = (option, index) => {
    if (option && typeof option === "string" && option.startsWith("\\")) {
      // If the option starts with '\\', it's assumed to be a KaTeX equation
      return <KatexEquationRenderer key={index} equation={option} />;
    } else if (
      option &&
      typeof option === "string" &&
      option.startsWith("https")
    ) {
      // If the option is a URL, render it as an image
      return (
        <Image
          key={index}
          src={option}
          alt={`Option ${String.fromCharCode(65 + index)}`}
          maxH="200px"
          maxW="200px"
        />
      );
    } else {
      // Otherwise, it's rendered as plain text
      return (
        <Text key={index} fontSize="lg">
          {option}
        </Text>
      );
    }
  };

  return (
    <>
      <PageTitle title={exam ? exam.name : "Exam"} />
      <Container maxW="container.xl" p={0}>
        <Flex
          direction={isSidebarOpen ? "row" : "column"}
          p={4}
          minH="100vh"
          overflow="hidden"
          position="relative"
          align={isSidebarOpen ? "flex-start" : "center"}
        >
          <Box
            w={isSidebarOpen ? "80%" : "100%"}
            h="100%"
            boxShadow="lg"
            borderRadius="lg"
            p={4}
            overflow="hidden"
            position="relative"
            marginTop={"50px"}
          >
            <Flex justify="space-between" align="center" mb={4} h="100%">
              <Heading as="h1" size="lg" color="blue.600">
                {exam ? exam.name : "Exam"} Questions
              </Heading>
              {remainingTime > 0 ? (
                <Text
                  fontSize="lg"
                  fontWeight={remainingTime <= 60 ? "bold" : "normal"}
                  color={remainingTime <= 60 ? "red" : "blue.600"}
                  flexWrap={isSidebarOpen ? "wrap" : "nowrap"}
                  style={
                    remainingTime === 30
                      ? { animation: "shakeclock 0.5s infinite" }
                      : {}
                  }
                >
                  ⏲️ {Math.floor(remainingTime / 60)}:
                  {remainingTime % 60 < 10
                    ? `0${remainingTime % 60}`
                    : remainingTime % 60}
                </Text>
              ) : (
                <Text fontSize="lg" fontWeight="bold" color="red">
                  Time&apos;s Up!
                </Text>
              )}
              <Button
                onClick={handleSidebarToggle}
                colorScheme="blue"
                size="sm"
              >
                <GiHamburgerMenu />
              </Button>
            </Flex>
            <VStack spacing={4} align="start">
              <Text fontSize="lg" fontWeight="bold">
                Question {currentQuestionIndex + 1}
              </Text>

              {getCurrentQuestion()?.text && (
                <Box
                  fontSize="lg"
                  className={!isExamSubmitted ? "unselectable nocopy" : ""}
                >
                  {handleQuestionRender(getCurrentQuestion()?.text)}
                </Box>
              )}

              {getCurrentQuestion()?.katexEquation && (
                <Text
                  fontSize="lg"
                  className={!isExamSubmitted ? "unselectable nocopy" : ""}
                >
                  {getCurrentQuestion()?.katexEquation && (
                    <KatexEquationRenderer
                      equation={getCurrentQuestion()?.katexEquation}
                    />
                  )}
                </Text>
              )}
              {getCurrentQuestion()?.image && (
                <Image
                  src={
                    !isFullScreen
                      ? "https://via.placeholder.com/200"
                      : getCurrentQuestion()?.image
                  }
                  alt="Question Image"
                  maxH="200px"
                  maxW="200px"
                />
              )}
              <VStack spacing={4} align="start">
                {isFullScreen ? (
                  getCurrentQuestion()?.options.map((option, i) => (
                    <Button
                      key={option}
                      variant={
                        selectedAnswers[getCurrentQuestion()._id] === i
                          ? "solid"
                          : "outline"
                      }
                      colorScheme={
                        selectedAnswers[getCurrentQuestion()._id] === i
                          ? "blue"
                          : "gray"
                      }
                      onClick={() =>
                        handleAnswerSelection(getCurrentQuestion()._id, i)
                      }
                      style={{
                        width: "auto",
                        height: "auto",
                        whiteSpace: "normal",
                        fontSize: "16px",
                        padding: "10px",
                      }}
                    >
                      {String.fromCharCode(65 + i)}.{" "}
                      {handleOptionRender(option)}
                    </Button>
                  ))
                ) : (
                  <Button variant="outline" disabled whiteSpace={"normal"}>
                    Please enter Full Screen to attempt the question
                  </Button>
                )}
              </VStack>
              <Flex
                justify="space-between"
                align="center"
                w="100%"
                flexWrap={"wrap"}
                mt={4}
              >
                <Flex>
                  <Button
                    colorScheme="blue"
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    p={4}
                    m={4}
                  >
                    Previous
                  </Button>
                  <Text
                    m={4}
                    color={"white"}
                    p={4}
                    whiteSpace={"normal"}
                    display={window.innerWidth < 768 ? "none" : "block"}
                  >
                    {currentQuestionIndex + 1} /{" "}
                    {exam?.module?.questions.length}
                  </Text>
                  <Button
                    colorScheme="blue"
                    onClick={handleNextQuestion}
                    disabled={
                      currentQuestionIndex ===
                      exam?.module?.questions.length - 1
                    }
                    p={4}
                    m={4}
                  >
                    Next
                  </Button>
                </Flex>
                <Flex>
                  <Button
                    colorScheme="blue"
                    onClick={handleClearSelection}
                    disabled={
                      selectedAnswers[getCurrentQuestion()._id] === undefined
                    }
                    rounded={"full"}
                    p={4}
                    m={4}
                  >
                    Clear
                  </Button>
                  <Button
                    colorScheme={
                      reviewedQuestions[getCurrentQuestion()._id]
                        ? "purple"
                        : "gray"
                    } // Button color based on review status
                    onClick={handleMarkForReview}
                    rounded={"full"}
                    p={4}
                    m={4}
                  >
                    {reviewedQuestions[getCurrentQuestion()._id]
                      ? "Unmark"
                      : "Mark"}{" "}
                    for Review
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={handleLeaveConfirmation}
                    disabled={isExamSubmitted || remainingTime <= 0}
                    rounded={"full"}
                    p={4}
                    m={4}
                  >
                    Submit Exam
                  </Button>
                </Flex>
              </Flex>
            </VStack>
          </Box>
          <Box
            w={isSidebarOpen ? "20%" : "0"}
            h="100%"
            boxShadow="lg"
            borderRadius="lg"
            p={4}
            overflow="auto"
            position="relative"
            display={isSidebarOpen ? "block" : "none"}
          >
            <VStack spacing={4} align="start">
              {exam?.module?.questions.map((question, index) => {
                const isAnswered = selectedAnswers[question._id] !== undefined;
                const isVisited = questionStatus[question._id] !== undefined;
                const isCurrentQuestion = currentQuestionIndex === index;
                let colorScheme = "gray";
                if (isAnswered) {
                  colorScheme = "green";
                } else if (isVisited) {
                  colorScheme = "red";
                } else if (isCurrentQuestion) {
                  colorScheme = "blue";
                }
                return (
                  <Button
                    key={question._id}
                    colorScheme={colorScheme}
                    variant={currentQuestionIndex === index ? "solid" : "solid"}
                    onClick={() => handleQuestionSelection(index)}
                    rounded={"full"}
                    width={"40px"}
                  >
                    {index + 1}
                  </Button>
                );
              })}
            </VStack>
          </Box>
        </Flex>
        <AlertDialog
          isOpen={showSubmitConfirmation}
          onClose={handleCloseSubmitConfirmation}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>Submit Exam</AlertDialogHeader>
              <AlertDialogBody>
                Are you sure you want to submit the exam?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button colorScheme="red" onClick={handleConfirmSubmit}>
                  Submit
                </Button>
                <Button onClick={handleCancelSubmit}>Cancel</Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
        {isFullScreen ? (
          <Button
            position="fixed"
            bottom={4}
            right={4}
            colorScheme="blue"
            onClick={toggleFullScreen}
          >
            <FaCompress />
          </Button>
        ) : (
          <Button
            position="fixed"
            bottom={4}
            right={4}
            colorScheme="blue"
            onClick={toggleFullScreen}
          >
            <FaExpand />
          </Button>
        )}
      </Container>
    </>
  );
};

export default ExamQuestionsPage;
