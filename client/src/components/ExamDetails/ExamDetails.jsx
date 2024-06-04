/* eslint-disable no-unused-vars */
import { Box, Grid, Heading, Text, VStack, Divider, Center, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getSingleExam, startExamAttempt } from '../../store/action/examAction';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Loader } from "../../index.js";
import axios from 'axios';
import { server } from '../../store/store';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { loadUser } from '../../store/action/userAction.js';
import { FaMoneyBillWave } from 'react-icons/fa';
import PageTitle from '../../PageTitle.jsx';
const ExamDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { exam, loading, message } = useSelector(state => state.exam);
    const length = exam?.module?.questions?.length;
    const { user } = useSelector(state => state.user);
    const [expanded, setExpanded] = useState(false);
    const [key, setKey] = useState('');

    useEffect(() => {
        dispatch(getSingleExam(id));
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
        getKey();
    }, [dispatch, id, message]);

    const getKey = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            const { data } = await axios.get(`${server}/razorpay-key`, config);
            setKey(data.key);
        } catch (error) {
            console.error('Error getting Razorpay key:', error);
        }
    };

    const startAttempt = async () => {
        try {
            await dispatch(startExamAttempt(id));
            navigate(`/start/exam/${id}`);
        } catch (error) {
            console.error('Error starting exam attempt:', error);
        }
    };

    const enrollForExam = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            };
            if (exam.price === 0) {
                const enrollResponse = await axios.post(`${server}/exam/enroll`, {
                    examId: id,
                }, config);

                if (enrollResponse.data.success) {
                    toast.success('Enrolled successfully!');
                    dispatch(loadUser());
                    navigate('/exampaymentsuccess');
                } else {
                    toast.error('Failed to enroll!');
                    navigate('/exampaymentfailure');
                }
                return;
            }
            try {
                const orderResponse = await axios.post(`${server}/exam/order`, {
                    amount: exam.price,
                    currency: 'INR',
                    examId: id,
                }, config);
                const { razorpayOrder } = orderResponse.data;
                const options = {
                    key: key,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    order_id: razorpayOrder.id,
                    name: 'Vinidra Exam',
                    description: 'Enrollment for Exam',
                    handler: async function (response) {
                        const { razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature } = response;
                        const config = {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            withCredentials: true,
                        };
                        const verifyResponse = await axios.post(`${server}/exam/verify`, {
                            orderId,
                            paymentId,
                            signature,
                        }, config);
                        if (verifyResponse.data.success) {
                            toast.success('Payment verification successful!');
                            navigate('/exampaymentsuccess');
                            dispatch(loadUser());
                        } else {
                            toast.error('Payment verification failed!');
                            navigate('/exampaymentfailure');
                        }
                    },
                };
                const razorpayInstance = new window.Razorpay(options);
                razorpayInstance.open();
            } catch (error) {
                toast.error(error.response.data.message);
                console.error('Error creating order:', error.response.data.message);
            }
        } catch (error) {
            console.error('Error enrolling for exam:', error);
        }
    };

    return (
        <>
            <PageTitle title={`${exam?.name} Exam`} />
            <Center minH={['100vh', '100vh']} p="4">
                <Box borderWidth="1px" borderRadius="xl" p="8" boxShadow="lg" width={['80%', '40%']} my="8" padding={['4', '8']} marginTop={4}>
                    {loading ? (
                        <Loader />
                    ) : (
                        <VStack spacing="8" align="start" justify="center" width="100%">
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                                <Box>
                                    <Heading as="h1" size="xl" mb="4">
                                        {exam?.name}
                                    </Heading>
                                    <Text>{exam?.description}</Text>
                                    <Divider my="4" />
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                                        <Box>
                                            <Heading size="md" mb="2">No Of Questions</Heading>
                                            <Text>{length}</Text>
                                            <Divider my={2} />
                                        </Box>
                                    </motion.div>
                                    <Box display="flex" alignItems="center">
                                        <Box ml="2">
                                            <FaMoneyBillWave />
                                            <Text fontSize="sm">Price</Text>
                                            <Text fontSize="lg">₹ {exam?.price === 0 ? 'Free' : exam?.price} </Text>
                                        </Box>
                                    </Box>
                                    <Divider />
                                </Box>
                            </motion.div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                                <Box>
                                    <Heading size="md" mb="4">Module</Heading>
                                    <Text>{exam?.module?.name}</Text>
                                    <Divider my="4" />
                                </Box>
                            </motion.div>

                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
                                <Box>
                                    <Heading size="md" mb="4">Duration</Heading>
                                    <Text>{exam?.duration} minutes</Text>
                                    <Heading size="md" mb="4">Schedule Date</Heading>
                                    <Text>{new Date(exam?.scheduledDate).toDateString()}</Text>
                                    <Divider my="4" />
                                </Box>
                            </motion.div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
                                <Box>
                                    <Heading size="md" mb="4">Rules</Heading>
                                    <VStack align="start">
                                        {exam?.rules.map((rule, index) => (
                                            <Text key={index}>{index + 1}. {rule}</Text>
                                        ))}
                                    </VStack>
                                    <Divider my="4" />
                                </Box>
                            </motion.div>
                            {user && user?.examsEnrolled.find(exam => exam.exam === id) ? (
                                <Link to={`/exam/${id}`}>
                                    <Button colorScheme="green" size="sm" variant="outline" width="100%" className='button-view' onClick={startAttempt}>
                                        Attempt Exam
                                    </Button>
                                </Link>
                            ) : (
                                <Button colorScheme="green" size="sm" variant="outline" width="100%" onClick={enrollForExam} className='button-view'>
                                    Enroll
                                </Button>
                            )}
                        </VStack>
                    )}
                </Box>
            </Center >
       </>
    );
};

export default ExamDetails;
