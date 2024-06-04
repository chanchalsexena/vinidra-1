import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Table, Tr, Th, Td, Thead, Tbody,
    VStack, Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Text, useDisclosure, HStack, IconButton, Heading, Textarea, Image
} from "@chakra-ui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { MdFileDownload } from "react-icons/md";
import Layout from "../DashBoard/Layout";
import { getAllExams, updateExam, getSingleExam, deleteExam, downloadReport } from "../../../store/action/examAction";
import toast from "react-hot-toast";
import PageTitle from "../../../PageTitle";
import katex from 'katex';

const KatexEquationRenderer = ({ equation }) => {
  try {
    return <div dangerouslySetInnerHTML={{ __html: katex.renderToString(equation, { throwOnError: false }) }} />;
  } catch (error) {
    console.error('Error rendering KaTeX:', error);
    return <div>Error rendering equation</div>;
  }
};
const handleKatexEquationChange = (index, e) => {
    const questions = [...examDetails.module.questions];
    questions[index] = {...questions[index], katexEquation: e.target.value, text: '' };
    setExamDetails(examDetails => ({...examDetails, module: {...examDetails.module, questions } }));
  };
const KatexOptionRenderer = ({ option }) => {
  try {
    return <div dangerouslySetInnerHTML={{ __html: katex.renderToString(option, { throwOnError: false }) }} />;
  } catch (error) {
    console.error('Error rendering KaTeX:', error);
    return <div>Error rendering option</div>;
  }
};
const GetAllExams = () => {
    const dispatch = useDispatch();
    const { exams, loading, exam, error, message, totalPages, currentPage } = useSelector(state => state.exam);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const [examToDelete, setExamToDelete] = useState(null);
    const [keyWord, setKeyWord] = useState('');
    const [examsFound, setExamsFound] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        module: {
            name: "",
            questions: [{ text: "", katexEquation: "", options: ["", "", "", ""], correctOptionIndex: 0, image: "" }]
        },
        price: 0,
        scheduledDate: "",
        duration: "",
        rules: [""]
    });
    useEffect(() => {
        const fetchExams = async () => {
            const { exams } = await dispatch(getAllExams(keyWord));
            setExamsFound(exams.length > 0);
        };
        fetchExams();
        return () => {
            dispatch({ type: 'clearExams' });
        };
    }, [dispatch, keyWord]);

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

    useEffect(() => {
        dispatch(getAllExams());
    }, [dispatch]);


    const handleRuleChange = (index, e) => {
        const rules = [...formData.rules];
        rules[index] = e.target.value;
        setFormData(prevState => ({ ...prevState, rules }));
    };


    const handleDelete = async () => {
        await dispatch(deleteExam(examToDelete._id)).then((res) => {
            if (res) {
                onClose();
                dispatch(getAllExams());
            }
        });
    };

    const handleUpdateQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = formData.module.questions.map((question, i) => {
            if (i === index) {
                return {
                    ...question, [name]: name === 'correctOptionIndex' ? parseInt(value) : value

                };
            }
            return question;
        });
        setFormData(prevState => ({
            ...prevState,
            module: {
                ...prevState.module,
                questions: updatedQuestions
            }
        }));
    };


    const handleDownloadReport = async (examId) => {
        try {
            const response = await dispatch(downloadReport(examId));
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `report_${examId}.xlsx`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.error('Error downloading report:', error);
            toast.error('Error downloading report');
        }
    };

    const addNewQuestion = () => {
        setFormData(prevState => ({
            ...prevState,
            module: {
                ...prevState.module,
                questions: [
                    ...prevState.module.questions,
                    { text: "", katexEquation: "", options: ["", "", "", ""], correctOptionIndex: 0, image: "" }
                ]
            }
        }));
    };

    const closeLastQuestion = () => {
        if (formData.module.questions.length > 1) {
            setFormData(prevState => ({
                ...prevState,
                module: {
                    ...prevState.module,
                    questions: prevState.module.questions.slice(0, -1)
                }
            }));
        }
    };

    const KatexOptionRenderer = ({ option }) => {
        try {
            // Check if the option is an image URL
            const isImage = option.startsWith("http");
    
            if (isImage) {
                return (
                    <Box>
                        <Image src={option} alt="Option Image" maxH="200px" maxW="200px" />
                    </Box>
                );
            } else {
                return (
                    <Box>
                        <div dangerouslySetInnerHTML={{ __html: katex.renderToString(option, { throwOnError: false }) }} />
                    </Box>
                );
            }
        } catch (error) {
            console.error('Error rendering KaTeX:', error);
            return <div>Error rendering option</div>;
        }
    };
    
      
      
    const handlePageChange = (page) => {
        dispatch(getAllExams(keyWord, page));
    }

    return (
        <>
            <PageTitle title="All Exams" />
            <Layout>
                <VStack width={['100%', '80%', '70%', '60%']} m="auto" p={4} spacing={4}>
                    <Heading>All Exams</Heading>
                    <Box width="100%" display="flex" justifyContent="flex-end">
                        <FormControl>
                            <FormLabel>Search</FormLabel>
                            <Input
                                type="text"
                                value={keyWord}
                                onChange={(e) => setKeyWord(e.target.value)}
                                placeholder="Enter keyword"
                            />
                        </FormControl>
                    </Box>
                    {examsFound > 0 ? (
                        <Box>
                            <Table variant="striped" colorScheme="teal" size="sm">
                                <Thead>
                                    <Tr>
                                        <Th>Name</Th>
                                        <Th>Description</Th>
                                        <Th> No of Questions</Th>
                                        <Th>Price</Th>
                                        <Th>Duration</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {exams.map(exam => (
                                        <Tr key={exam._id}>
                                            <Td>{exam.name}</Td>
                                            <Td>{exam.description}</Td>
                                            <Td>{exam.module.questions.length}</Td>
                                            <Td>{exam.price}</Td>
                                            <Td>{exam.duration}</Td>
                                            <Td>
                                                <HStack> 
                                                    <IconButton colorScheme="teal" aria-label="Edit" icon={<FaEdit />}
                                                        onClick={() => {
                                                            dispatch(getSingleExam(exam._id)).then(() => {
                                                                setFormData({
                                                                    name: exam.name,
                                                                    description: exam.description,
                                                                    price: exam.price,
                                                                    duration: exam.duration,
                                                                    rules: exam.rules,
                                                                    module: {
                                                                        name: exam.module.name,
                                                                        questions: exam.module.questions
                                                                    }
                                                                });
                                                                onOpenEdit();
                                                            });
                                                        }}
                                                        isDisabled={loading}
                                                    />

                                                    <IconButton colorScheme="red" aria-label="Delete" icon={<FaTrash />}
                                                        onClick={() => {
                                                            setExamToDelete(exam);
                                                            onOpen();
                                                        }}
                                                        isDisabled={loading}
                                                    />
                                                    <IconButton colorScheme="teal" aria-label="Download Report" icon={<MdFileDownload />} onClick={() => handleDownloadReport(exam._id)}
                                                        disabled={exam.participants.length === 0}
                                                    />
                                                </HStack>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    ) : (
                        <Text>No exams found.</Text>
                    )}
                    <Box>

                        <Box mt={4}>
                            {totalPages > 1 && (
                                <HStack>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <Button key={index + 1} onClick={() => handlePageChange(index + 1)} variant={index + 1 === currentPage ? "solid" : "outline"}>
                                            {index + 1}
                                        </Button>
                                    ))}
                                </HStack>
                            )}
                        </Box>
                    </Box>
                </VStack>

                {/* Delete Modal */}
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete Exam</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Are you sure you want to delete this exam?</Text>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="red" mr={3} onClick={handleDelete}
                                isLoading={loading}
                            >
                                Delete
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

                {/* Edit Modal */}
                <Modal isOpen={isOpenEdit} onClose={onCloseEdit}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Exam</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input type="text" name="name" value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea name="description" value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Price</FormLabel>
                                <Input type="number" name="price" value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Duration</FormLabel>
                                <Input type="number" name="duration" value={formData.duration}
                                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Module Name</FormLabel>
                                <Input type="text" name="module" value={formData.module.name}
                                    onChange={(e) => setFormData({ ...formData, module: { ...formData.module, name: e.target.value } })}
                                />
                            </FormControl>
                            {/* Form controls for updating questions */}
                            {formData.module.questions.map((question, index) => (
                                <Box key={index} border="1px solid #ccc" p={2} my={4}>
                                    <FormControl>
                                        <FormLabel>Question {index + 1}</FormLabel>
                                        <Textarea name="text" value={question.text} onChange={(e) => handleUpdateQuestionChange(index, e)} />
                                        <KatexEquationRenderer equation={question.text} />
                                    </FormControl>
                                
                                    <FormControl>
                                        <FormLabel>Image</FormLabel>
                                        <Input type="text" name="image" value={question.image} onChange={(e) => handleUpdateQuestionChange(index, e)} />
                                        {
                                            question.image && <Image src={question.image} alt="Question Image" maxH="200px" maxW="200px" />
                                        }
                                    </FormControl>
                                    <FormControl>
    <FormLabel>Options</FormLabel>
    {question.options.map((option, optionIndex) => (
        <Box key={optionIndex} display="flex" flexDirection="column">
            <Input
                type="text"
                value={option}
                onChange={(e) => {
                    const updatedOptions = question.options.map((opt, i) => {
                        if (i === optionIndex) {
                            return e.target.value;
                        }
                        return opt;
                    });
                    handleUpdateQuestionChange(index, { target: { name: 'options', value: updatedOptions } });
                }}
            />
            <KatexOptionRenderer option={option} />
        </Box>
    ))}
</FormControl>

                                    <FormControl>
                                        <FormLabel>Correct Option Index</FormLabel>
                                        <Input type="number" name="correctOptionIndex"
                                            step={1}
                                            value={question.correctOptionIndex} onChange={(e) => handleUpdateQuestionChange(index, e)} />
                                    </FormControl>
                                </Box>
                            ))}

                            {/* Form controls for updating rules */}
                            <FormControl>
                                <FormLabel>Exam Rules</FormLabel>
                                {formData.rules.map((rule, index) => (
                                    <HStack key={index}>
                                        <Input value={rule} onChange={(e) => handleRuleChange(index, e)} />
                                    </HStack>
                                ))}

                            </FormControl>
                            <Button colorScheme="teal" onClick={addNewQuestion} mt={4} w={["100%", "50%"]}
                            >
                            <FaPlus /> Add Question
                        </Button>

                        <Button colorScheme="red" onClick={closeLastQuestion} mt={4} w={["100%", "50%"]}>
                            Close Last Question
                        </Button>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="teal" isLoading={loading} mr={3} onClick={async () => {
                                await dispatch(updateExam(exam._id, formData));
                                onCloseEdit();
                                dispatch(getAllExams());
                            }}>
                                Update
                            </Button>
                            <Button onClick={onCloseEdit}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Layout>
        </>
    );
} 

export default GetAllExams;
