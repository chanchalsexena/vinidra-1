import React from 'react';
import { Grid, Box, Text } from '@chakra-ui/react';
import ExamType from './ExamType';

const CoursePage = ({ course }) => {
  const grades = course.grades;

  return (
    <Box>
      <Text fontSize="3xl" fontWeight="bold" mb={4}>
        {course.name}
      </Text>
      <Text mb={4}>{course.description}</Text>
      <Grid marginLeft="30px" spacing={8} templateColumns='repeat(auto-fill, minmax(350px, 1fr))' gap={5}>
        {grades.map((grade, index) => (
          <ExamType
            exam={course}
            key={grade}
            grades={[grade]}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default CoursePage;