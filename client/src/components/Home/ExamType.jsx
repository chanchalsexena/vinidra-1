import React from 'react';
import { Box, Flex, Image, Button, Text } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { Link } from "react-router-dom";

const ExamType = ({ exam, grades }) => {
  return (
    <Box bg="rgba(255, 255, 255, 0.1)" borderRadius="10px" p="10px" w="350px" h="250px" border="1px solid #ccc" boxShadow="5px 2px 4px rgba(0, 0, 0, 0.1)">
      <Flex direction="row" alignItems="center">
        <Image src={exam.image} alt="Exam" w="40%" h="40%" objectFit="cover" borderRadius="10px 10px 0 0" transition="transform 0.3s ease-in-out" _hover={{ transform: 'scale(1.2)' }} />
        <Flex direction="column" alignItems="flex-start" ml="35px">
          <Text fontSize="2xl" fontWeight="bold">
            {exam.name}
          </Text>
        </Flex>
      </Flex>
      <Flex direction="row" alignItems="center" mt="10px">
        {grades.map((grade, index) => (
          <Link to={`/Test/${grade}`} key={index}>
            <Button borderRadius="20px" bg="transparent" color="themeColor" border="1px solid gray" _hover={{ bg: "rgba(128, 0, 128, 0.1)", color: "purple" }} mr="10px">
              {grade}
            </Button>
          </Link>
        ))}
      </Flex>
      <Flex direction="column" justifyContent="flex-end" mt="10px">
        <Link to={`/exams/${exam.name}`}>
          <Button bg="transparent" color="purple" border="1px solid purple" _hover={{ bg: "rgba(128, 0, 128, 0.9)", color: "white" }} mr="10px" display="flex" alignItems="center" justifyContent="space-between" w="">
            Explore More
            <FaChevronRight />
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default ExamType;