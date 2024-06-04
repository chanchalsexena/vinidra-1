import { useState, useEffect } from "react";
import { Container, Heading, Input, Button, Stack, VStack, Text, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { getAllExams } from "../../store/action/examAction";
import { useSelector, useDispatch } from "react-redux"
import toast from "react-hot-toast";
import PageTitle from "../../PageTitle";
const ExamPage = () => {

    const dispatch = useDispatch();
    const { exams, message } = useSelector((state) => state.exam);
    const { user } = useSelector((state) => state.user);
    const [keyword, setKeyword] = useState("");
    const isMobile = useBreakpointValue({ base: true, sm: false });

    useEffect(() => {
        dispatch(getAllExams(keyword));
        if (message) {
            toast.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, keyword, message]);

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(getAllExams(keyword));
    };

    // Filter exams based on user's enrollment status
    const enrolledExams = exams.filter((exam) => {
        if (user && user.role === "student") {
            return user.examsEnrolled.some((enrolledExam) => enrolledExam.exam === exam._id);
        }
        return true;
    });
    //Fix The Issue Of Button Click To get Same Id Of Exam
    const renderButton = (exam) => {

        const attempt = user.examsEnrolled.find(enrolledExam => enrolledExam.exam === exam._id);
        if (attempt) {
            if (attempt.status === 'completed') {
                return (
                    <Link to={`/view/exam/${exam._id}`}>
                        <Button colorScheme="blue" size={isMobile ? "sm" : "md"}>{isMobile ? 'View result' : 'View Results'}</Button>
                    </Link>
                );
            } else {
                return (
                    <Link to={`/attempt/${exam._id}`}>
                        <Button colorScheme="blue" size={isMobile ? "sm" : "md"}>{isMobile ? 'Start' : 'Start Exam'}</Button>
                    </Link>
                );
            }
        }
        return null;
    };

    return (
        <>
            <PageTitle title={"Exams"} />
            <Container minH={"94vh"} >
                <Heading as="h1" size={isMobile ? "md" : "lg"} my={4} marginTop={10}>
                    Exams
                </Heading>
                <Stack direction={isMobile ? "column" : "row"} spacing={4} my={4}>
                    <Input
                        placeholder="Search exams"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        size={isMobile ? "sm" : "md"}
                    />
                    <Button onClick={handleSearch} size={isMobile ? "sm" : "md"}>{isMobile ? 'Search' : 'Search Exams'}</Button>
                </Stack>
                <VStack my={4} spacing={4} boxShadow={"md"} p={4} borderRadius={8}>
                    {enrolledExams.map((exam) => (
                        <Stack key={exam._id} direction={isMobile ? "column" : "row"} spacing={4} boxShadow={"md"} p={4} borderRadius={8}
                        >
                            <Text><strong>Exam Name:</strong> {exam.name}</Text>
                            <Text><strong>Duration:</strong> {exam.duration} minutes</Text>
                            <Text><strong>Date:</strong> {new Date(exam.scheduledDate).toLocaleDateString()}</Text>
                            <Text>{renderButton(exam)}</Text>
                        </Stack>
                    ))}
                </VStack>
            </Container>
        </>
    );
};
export default ExamPage;
