import React, { useState, useEffect } from 'react';
import { Flex, Input, Textarea, Text, IconButton, Button, Image } from '@chakra-ui/react';
import { FaPlus } from 'react-icons/fa';
import Layout from '../DashBoard/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { createExam } from '../../../store/action/examAction';
import toast from 'react-hot-toast';
import PageTitle from '../../../PageTitle';
import katex from 'katex';

const KatexEquationRenderer = ({ equation }) => {
  try {
    return <div dangerouslySetInnerHTML={{ __html: katex.renderToString(equation, { throwOnError: false }) }} />;
  } catch (error) {
    console.error('Error rendering KaTeX:', error);
    return <div>Error rendering equation</div>;
  }
};

const KatexOptionRenderer = ({ option }) => {
  try {
    return <div dangerouslySetInnerHTML={{ __html: katex.renderToString(option, { throwOnError: false }) }} />;
  } catch (error) {
    console.error('Error rendering KaTeX:', error);
    return <div>Error rendering option</div>;
  }
};

const AddExamComponent = () => {
  const [examDetails, setExamDetails] = useState({
    name: '',
    description: '',
    module: {
      name: '',
      questions: [{
        text: '', // Plain text option
        katexEquation: '', // KaTeX option
        options: ['', '', '', ''],
        correctOptionIndex: 0,
        image: ""
      }],
    },
    rules: [''],
    price: 0,
    scheduledDate: '',
    duration: '',
  });

  const dispatch = useDispatch();
  const { message, error, loading } = useSelector(state => state.exam);

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
  }, [message, error, dispatch]);

  const handleRuleChange = (index, e) => {
    const rules = [...examDetails.rules];
    rules[index] = e.target.value;
    setExamDetails(examDetails => ({ ...examDetails, rules }));
  };

  const handleAddRule = () => {
    setExamDetails(examDetails => ({ ...examDetails, rules: [...examDetails.rules, ''] }));
  };

  const handleKatexEquationChange = (index, e) => {
    const questions = [...examDetails.module.questions];
    questions[index] = { ...questions[index], katexEquation: e.target.value, text: '' };
    setExamDetails(examDetails => ({ ...examDetails, module: { ...examDetails.module, questions } }));
  };

  const handleOptionChange = (index, optionIndex, e) => {
    const questions = [...examDetails.module.questions];
    questions[index].options[optionIndex] = e.target.value;
    setExamDetails(examDetails => ({ ...examDetails, module: { ...examDetails.module, questions } }));
  };

  const handleCorrectOptionIndexChange = (index, e) => {
    const questions = [...examDetails.module.questions];
    questions[index].correctOptionIndex = e.target.value;
    setExamDetails(examDetails => ({ ...examDetails, module: { ...examDetails.module, questions } }));
  };

  const handleImageChange = (index, e) => {
    const questions = [...examDetails.module.questions];
    questions[index].image = e.target.value;
    setExamDetails(examDetails => ({ ...examDetails, module: { ...examDetails.module, questions } }));
  };

  const handleTextChange = (index, e) => {
    const questions = [...examDetails.module.questions];
    questions[index].text = e.target.value;
    setExamDetails(examDetails => ({ ...examDetails, module: { ...examDetails.module, questions } }));
  };

  const handleAddQuestion = () => {
    setExamDetails(examDetails => ({
      ...examDetails,
      module: {
        ...examDetails.module,
        questions: [...examDetails.module.questions, {
          text: '', // Plain text option
          katexEquation: '', // KaTeX option
          options: ['', '', '', ''],
          correctOptionIndex: 0,
          image: ""
        }],
      },
    }));
  };

  const submitExam = async (e) => {
    e.preventDefault();
    const questions = examDetails.module.questions;
    if (questions.some((question) => !question.text)) {
      toast.error('Please enter question text for each question');
      return;
    }
    await dispatch(createExam(examDetails));
  };

  return (
    <>
      <PageTitle title="Add Exam" />
      <Layout>
        <Flex direction="column" alignItems="center" width={['100%', '80%', '60%']} mx="auto" mt={8}>
          <Text fontSize="3xl" fontWeight="bold" mb={4}>
            Add Exam
          </Text>
          {/* Input fields for exam details */}
          <Input
            placeholder="Exam Name"
            mb={4}
            value={examDetails.name}
            onChange={(e) => setExamDetails(examDetails => ({ ...examDetails, name: e.target.value }))}
          />
          <Textarea
            placeholder="Description"
            mb={4}
            value={examDetails.description}
            onChange={(e) => setExamDetails(examDetails => ({ ...examDetails, description: e.target.value }))}
          />
          <Input
            placeholder="Module Name"
            mb={4}
            value={examDetails.module.name}
            onChange={(e) => setExamDetails(examDetails => ({ ...examDetails, module: { ...examDetails.module, name: e.target.value } }))}
          />
          <Input
            type="number"
            placeholder="Price"
            mb={4}
            value={examDetails.price}
            onChange={(e) => setExamDetails(examDetails => ({ ...examDetails, price: e.target.value }))}
          />
          <Input
            type="date"
            placeholder="Scheduled Date"
            mb={4}
            value={examDetails.scheduledDate}
            onChange={(e) => setExamDetails(examDetails => ({ ...examDetails, scheduledDate: e.target.value }))}
          />
          <Input
            type="number"
            placeholder="Duration (in minutes)"
            mb={4}
            value={examDetails.duration}
            onChange={(e) => setExamDetails(examDetails => ({ ...examDetails, duration: e.target.value }))}
          />
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Exam Rules
          </Text>
          {/* Rule inputs */}
          {examDetails.rules.map((rule, index) => (
            <Flex alignItems="center" mb={2} w={['100%', '80%', '60%']} key={index}>
              <Textarea
                key={index}
                value={rule}
                onChange={(e) => handleRuleChange(index, e)}
                placeholder="Enter rule"
                mr={2}
              />
              <IconButton
                icon={<FaPlus />}
                variant="outline"
                colorScheme="green"
                onClick={() => handleAddRule()}
                ml={2}
              />
            </Flex>
          ))}
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text fontSize="xl" fontWeight="bold" my={4}>
            Exam Questions
          </Text>

          {/* Question inputs */}
          {examDetails.module.questions.map((question, index) => (
            <Flex direction="column" alignItems="flex-start" mb={4} w={['100%', '80%', '60%']} key={index}>
              {/* Input for text */}
              <Textarea
                name="text"
                value={question.text}
                onChange={(e) => handleTextChange(index, e)}
                placeholder="Enter question text"
                mb={2}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const questions = [...examDetails.module.questions];
                    questions[index].text += '\n';
                    setExamDetails(examDetails => ({ ...examDetails, module: { ...examDetails.module, questions } }));
                  }
                }}
              />
              {/* Render text as KaTeX */}
              {question.text && (
                <KatexEquationRenderer equation={question.text} />
              )}
              {/* Input for image */}
              <Input
                name="image"
                value={question.image}
                onChange={(e) => handleImageChange(index, e)}
                placeholder="Enter image URL"
                mb={2}
              />
              {question.image && <Image src={question.image} alt="Question" style={{ width: '100px', height: '100px' }} />}
              {/* Input for options */}
              {question.options.map((option, optionIndex) => (
                <Flex alignItems="center" mb={2} key={optionIndex}>
                  <Textarea
                    key={optionIndex}
                    name={`option-${optionIndex}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e)}
                    placeholder={`Option ${optionIndex + 1}`}
                    mr={2}
                  />
                  {/* Render KaTeX option */}
                  {option && typeof option === 'string' && (
                    <KatexOptionRenderer option={option} />
                  )}
                </Flex>
              ))}
              {/* Input for correct option index */}
              <Input
                type="number"
                step={1}
                name="correctOptionIndex"
                value={question.correctOptionIndex}
                onChange={(e) => handleCorrectOptionIndexChange(index, e)}
                placeholder="Correct Option Index(0-3)"
                mb={2}
                w="100px"
              />
            </Flex>
          ))}
          {/* Button to add new question */}
          <IconButton
            icon={<FaPlus />}
            variant="outline"
            colorScheme="green"
            mt={4}
            onClick={() => handleAddQuestion()}
          >
            Add Question
          </IconButton>
        </Flex>
        <Flex justifyContent="center" mt={4}>
          <Button
            colorScheme="green"
            size="lg"
            onClick={submitExam}
            disabled={loading}
            isLoading={loading}
          >
            Create Exam
          </Button>
        </Flex>
      </Layout>
    </>
  );
};

export default AddExamComponent;
