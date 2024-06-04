import { Container, Heading, VStack, Box, Text, Table,Thead,Tbody,Tr,Th,Td,Image } from "@chakra-ui/react";
import { useSelector,useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { getTop10Scores } from "../../store/action/examAction";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PageTitle  from "../../PageTitle";
const ExamDashboard = () => {
    const { data, exam, topScores } = useSelector((state) => state.exam);
    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTop10Scores(id));
    }, [dispatch, id]);

    // Function to get question text and options by ID
    const getQuestionInfoById = (questionId) => {
        const question = exam?.module?.questions.find((q) => q._id === questionId);
        return question ? { text: question.text, options: question.options, image: question.image } : { text: "Question not found", options: [] };
    };

    // Chart data
    const chartData = {
        labels: ["Correct", "Incorrect"],
        datasets: [
            {
                data: [data?.performanceStats?.score, data?.performanceStats?.totalQuestions - data?.performanceStats?.score],
                backgroundColor: ["#FF6384", "#36A2EB"], // Changed colors
                hoverBackgroundColor: ["#FF6384", "#36A2EB"], // Changed hover colors
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
                backgroundColor: ["#FF6384", "#36A2EB"], // Changed colors
                hoverBackgroundColor: ["#FF6384", "#36A2EB"], // Changed hover colors
                borderWidth: 1,
            },
        ],
    };

    // Chart For Percentage
    const percentage = data?.performanceStats.percentageScore
    
    const percentageChartData = {
        labels: ["Percentage", "Percentage Remaining"],
        datasets: [
            {
                data: [percentage, 100 - percentage],
                backgroundColor: ["#FF6384", "#36A2EB"], // Changed colors
                hoverBackgroundColor: ["#FF6384", "#36A2EB"], // Changed hover colors
                borderWidth: 1,
            },
        ],
    };
   

    return (
        <>
            <PageTitle title="Exam Dashboard" />
            <Container maxW="container.md" textAlign="center" py={4} boxShadow="lg" borderRadius="lg" minH={"90vh"} p={8} className="nocopy noclick unselectable">
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
                                            <Text fontSize="md" color="gray.600" m={2}>
                                                {text}
                                            </Text>
                                            {image && <Image src={image} alt="Question" maxH="200px" maxW="200px" />}
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
                    <Box display="flex" justifyContent="center" flexWrap={{ base: "wrap", md: "nowrap" }}>

                        <Box w={{ base: "100%", md: "50%" }} p={4} mb={4}>
                            <Text fontSize="lg" color="blue.600">Performance Stats</Text>
                            <Text fontSize="md" color="gray.600">Incorrect Answer: {data?.incorrectQuestions?.length}</Text>
                            <Pie data={chartData} width={200} height={200} />
                        </Box>

                        <Box w={{ base: "100%", md: "50%" }} p={4} mb={4}>
                            <Text fontSize="lg" color="blue.600">Percentage Stats</Text>
                            <Text fontSize="md" color="gray.600">Percentage: {percentage}</Text>
                            <Pie data={percentageChartData} width={200} height={200} />
                        </Box>

                        <Box w={{ base: "100%", md: "50%" }} p={4} mb={4}>
                            <Text fontSize="lg" color="blue.600">Time Stats</Text>
                            <Text fontSize="md" color="gray.600">Time Taken: {data?.performanceStats?.timeTaken} minutes</Text>
                            <Pie data={timeChartData} width={200} height={200} />
                        </Box>

                    </Box>
                    <Box mt={8}>
                        <Heading as="h2" size="md" mb={4} color="blue.600">
                            Top 10 Scores
                        </Heading>
                        <Table variant="simple" size={"sm"}>
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
                                        <Th>{index + 1}</Th>
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

export default ExamDashboard;
