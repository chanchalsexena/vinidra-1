// import { useEffect } from 'react';
// import {
//   Container,
//   Heading,
//   Text,
//   Button,
//   VStack,
//   Box,
//   Flex,
// } from '@chakra-ui/react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getExamResult } from '../../store/action/examAction';
// import PageTitle from '../../PageTitle';

// const Result = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { result, error, loading } = useSelector((state) => state.exam);

//   useEffect(() => {
//     dispatch(getExamResult(id));
//   }, [dispatch, id]);

//   if (loading) {
//     return <Text>Loading...</Text>;
//   }

//   if (error) {
//     return <Text color="red.500">Failed to load exam result: {error}</Text>;
//   }

//   if (!result) {
//     return <Text>No result found.</Text>;
//   }

//   return (
//     <>
//       <PageTitle title="Exam Results" />
//       <Container maxW="container.xl" p={4}>
//         <Heading as="h1" size="lg" color="blue.600" mb={4}>
//           Exam Results
//         </Heading>
//         <VStack spacing={4} align="start">
//           <Text fontSize="xl">Exam Name: {result.exam.name}</Text>
//           <Text fontSize="xl">Score: {result.score} / {result.exam.module.questions.length}</Text>
//           <Text fontSize="xl">Time Taken: {result.timeTaken} seconds</Text>
//         </VStack>
//         <Box mt={8}>
//           <Heading as="h2" size="md" color="blue.600" mb={4}>
//             Detailed Results
//           </Heading>
//           {result.exam.module.questions.map((question, index) => (
//             <Box key={question._id} mb={4} p={4} borderWidth="1px" borderRadius="lg">
//               <Flex justify="space-between">
//                 <Text fontWeight="bold">Question {index + 1}</Text>
//                 <Text color={result.answers[index].isCorrect ? 'green.500' : 'red.500'}>
//                   {result.answers[index].isCorrect ? 'Correct' : 'Incorrect'}
//                 </Text>
//               </Flex>
//               <Text mt={2}>{question.text}</Text>
//               <VStack mt={2} align="start">
//                 {question.options.map((option, i) => (
//                   <Text key={i} color={i === question.correctOption ? 'green.500' : 'inherit'}>
//                     {String.fromCharCode(65 + i)}. {option}
//                   </Text>
//                 ))}
//               </VStack>
//               <Text mt={2} fontWeight="bold">
//                 Your Answer: {String.fromCharCode(65 + result.answers[index].selectedOptionIndex)}
//               </Text>
//               <Text fontWeight="bold">
//                 Correct Answer: {String.fromCharCode(65 + question.correctOption)}
//               </Text>
//             </Box>
//           ))}
//         </Box>
//         <Button colorScheme="blue" mt={4} onClick={() => navigate('/dashboard')}>
//           Back to Dashboard
//         </Button>
//       </Container>
//     </>
//   );
// };

// export default Result;


import { useEffect } from 'react';
import {
  Container,
  Heading,
  Text,
  Button,
  VStack,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllExams } from '../../store/action/examAction';
import PageTitle from '../../PageTitle';

const Result = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { results, error, loading } = useSelector((state) => state.exam);

  useEffect(() => {
    dispatch(getAllExams());
  }, [dispatch]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">Failed to load exam results: {error}</Text>;
  }

  if (!results || results.length === 0) {
    return <Text>No results found.</Text>;
  }

  return (
    <>
      <PageTitle title="Exam Results" />
      <Container maxW="container.xl" p={4}>
        <Heading as="h1" size="lg" color="blue.600" mb={4}>
          Exam Results
        </Heading>
        {results.map((result) => (
          <Box key={result.exam._id} mb={8} p={4} borderWidth="1px" borderRadius="lg">
            <VStack spacing={4} align="start">
              <Text fontSize="xl">Exam Name: {result.exam.name}</Text>
              <Text fontSize="xl">Score: {result.score} / {result.exam.module.questions.length}</Text>
              <Text fontSize="xl">Time Taken: {result.timeTaken} seconds</Text>
            </VStack>
            <Box mt={8}>
              <Heading as="h2" size="md" color="blue.600" mb={4}>
                Detailed Results
              </Heading>
              {result.exam.module.questions.map((question, index) => (
                <Box key={question._id} mb={4} p={4} borderWidth="1px" borderRadius="lg">
                  <Flex justify="space-between">
                    <Text fontWeight="bold">Question {index + 1}</Text>
                    <Text color={result.answers[index].isCorrect ? 'green.500' : 'red.500'}>
                      {result.answers[index].isCorrect ? 'Correct' : 'Incorrect'}
                    </Text>
                  </Flex>
                  <Text mt={2}>{question.text}</Text>
                  <VStack mt={2} align="start">
                    {question.options.map((option, i) => (
                      <Text key={i} color={i === question.correctOption ? 'green.500' : 'inherit'}>
                        {String.fromCharCode(65 + i)}. {option}
                      </Text>
                    ))}
                  </VStack>
                  <Text mt={2} fontWeight="bold">
                    Your Answer: {String.fromCharCode(65 + result.answers[index].selectedOptionIndex)}
                  </Text>
                  <Text fontWeight="bold">
                    Correct Answer: {String.fromCharCode(65 + question.correctOption)}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
        <Button colorScheme="blue" mt={4} onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </Button>
      </Container>
    </>
  );
};

export default Result;
