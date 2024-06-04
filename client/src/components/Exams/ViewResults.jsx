import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Heading,
    VStack,
    Box,
    Text,
    Table,
    Tr,
    Th,
    Td,
    Thead,
    Tbody,
    Wrap,
    WrapItem,
    Image
} from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { getResult, getTop10Scores, getSingleExam } from '../../store/action/examAction';
import PageTitle from '../../PageTitle';
const ViewResults = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data, topScores, exam } = useSelector((state) => state.exam);

    useEffect(() => {
        dispatch(getSingleExam(id));
        dispatch(getResult(id));
        dispatch(getTop10Scores(id));
    }, [dispatch, id]);

    // Function to get question text and options by ID
    const getQuestionInfoById = (questionId) => {
        if (exam && exam.module && exam.module.questions) {
            const question = exam.module.questions.find((q) => q._id === questionId);
            return question ? { text: question.text, options: question.options, image: question.image } : { text: "Question not found", options: [] };
        } else {
            return { text: "Question not found", options: [] };
        }
    };

    // Chart data
    const chartData = {
        labels: ["Correct", "Incorrect"],
        datasets: [
            {
                data: [data?.performanceStats?.score, data?.performanceStats?.totalQuestions - data?.performanceStats?.score],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                borderWidth: 1,
            },
        ],
    };

    // Chart Data for Time Taken
    const timeChartData = {
        labels: ["Time Taken", "Time Remaining"],
        datasets: [
            {
                data: [data?.performanceStats?.timeTaken, data?.performanceStats?.timeRemaining],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                borderWidth: 1,
            },
        ],
    };

    // Chart For Percentage
    const percentage = data?.performanceStats.percentageScore;

    const percentageChartData = {
        labels: ["Percentage", "Percentage Remaining"],
        datasets: [
            {
                data: [percentage, 100 - percentage],
                backgroundColor: ["#FF6384", "#36A2EB"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <>
            <PageTitle  title={`Results - ${exam?.name} Exam`} />
            <Container maxW="container.lg" textAlign="center" py={4} boxShadow="lg" borderRadius="lg" minH={"90vh"} p={8}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                    <Heading as="h1" size="lg" my={4} mb={8} color="blue.600">
                        Exam Dashboard
                    </Heading>
                    <VStack spacing={6} align="start">
                        <Box w="100%">
                            <Heading as="h2" size="md" mb={4} color="blue.600">
                                Incorrect Questions:
                            </Heading>
                            {data?.incorrectQuestions && data.incorrectQuestions.length > 0 ? (
                                data.incorrectQuestions.map((questionId, index) => {
                                    const { text, image, options } = getQuestionInfoById(questionId);
                                    return (
                                        <Box key={index} p={4} boxShadow="md" borderRadius="md" mb={4} textAlign="left"> {/* Adjusted alignment */}
                                            <Heading as="h3" size="sm" color="red.500">
                                                Question {index + 1}
                                            </Heading>
                                            <Text>{text}</Text>
                                            {image && <Image src={image} alt="Question Image" maxH="200px" maxW="200px" />}
                                            <Text fontWeight="bold">Options:</Text>
                                            {options.map((option, index) => (
                                                <Box key={index} p={2} borderRadius="md" mb={2}>
                                                    <Text >
                                                        {String.fromCharCode(65 + index).toUpperCase()}. {option}
                                                    </Text>
                                                </Box>
                                            ))}
                                        </Box>
                                    );
                                })
                            ) : (
                                <Text>No incorrect questions</Text>
                            )}
                        </Box>
                    </VStack>
                    <Wrap justify="center" mt={8} spacing="30px">
                        <WrapItem>
                            <Pie data={chartData} width={200} height={200} />
                        </WrapItem>
                        <WrapItem>
                            <Pie data={percentageChartData} width={200} height={200} />
                        </WrapItem>
                        <WrapItem>
                            <Pie data={timeChartData} width={200} height={200} />
                        </WrapItem>
                    </Wrap>
                    <Box mt={8} overflowX="auto">
                        <Heading as="h2" size="md" mb={4} color="blue.600">
                            Top 10 Scores
                        </Heading>
                        <Table variant="simple">
                            <Thead>
                                <Tr>
                                    <Th>Rank</Th>
                                    <Th>Name</Th>
                                    <Th>Username</Th>
                                    <Th>Score</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {topScores?.map((score, index) => (
                                    <Tr key={index}>
                                        <Td>{index + 1}</Td>
                                        <Td>{score?.fullname}</Td>
                                        <Td>{score?.username}</Td>
                                        <Td>{score?.score}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                </motion.div>
            </Container>
        </>
    );
};

export default ViewResults;
