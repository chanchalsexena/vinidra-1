/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Container, Heading, Input, Button, Text, Stack, VStack, Box, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getAllExams } from '../../store/action/examAction';
import { useSelector, useDispatch } from "react-redux";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { server } from '../../store/store';
import { loadUser } from '../../store/action/userAction';
import PageTitle from '../../PageTitle';

const ExamCard = ({ name, id, price }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const [key, setKey] = useState('');

    useEffect(() => {
        getKey().then((key) => setKey(key));
    }, []);

    const getKey = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        try {
            const { data } = await axios.get(`${server}/razorpay-key`, config);
            return data.key;
        } catch (error) {
            console.error('Error getting Razorpay key:', error);
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

            // Create Razorpay order
            const orderResponse = await axios.post(`${server}/exam/order`, {
                amount: price,
                currency: 'INR',
                examId: id,
            }, config);

            if (orderResponse.data.success) {
                const { razorpayOrder } = orderResponse.data;

                // Open Razorpay payment gateway
                const options = {
                    key: key,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    order_id: razorpayOrder.id,
                    name: 'Vinidra Exam',
                    description: 'Enrollment for Exam',
                    handler: async function (response) {
                        const { razorpay_payment_id: paymentId, razorpay_order_id: orderId, razorpay_signature: signature } = response;
                        const verifyResponse = await axios.post(`${server}/exam/verify`, {
                            orderId,
                            paymentId,
                            signature,
                        }, config);
                        if (verifyResponse.data.success) {
                            toast.success('Payment verification successful!');
                            dispatch(loadUser());
                            navigate('/exampaymentsuccess');
                        } else {
                            toast.error('Payment verification failed!');
                            // Redirect user back to Razorpay payment gateway if payment verification fails
                            window.location.href = razorpayOrder.notes.redirectUrl;
                        }
                    },
                };
                const razorpayInstance = new window.Razorpay(options);
                razorpayInstance.open();
            } else {
                // Handle error if creating Razorpay order fails
                toast.error(orderResponse.data.message);
            }
        } catch (error) {
            console.error('Error enrolling for exam:', error);
        }
    };

    return (
        <>
            <PageTitle title={"Exams"} />
            <VStack className="exam-card" alignItems={['center', 'flex-start']} w={['100%', '30%']} p="4" m="4" boxShadow="lg" borderRadius="md">
                <div className="image-section">
                    <Text fontSize="lg" fontWeight="bold">{name}</Text>
                </div>
                <Text fontSize="sm" fontWeight="bold">Price: ₹ {price === 0 ? 'Free' : price}</Text>
                <Stack direction={['column', 'row']} alignItems="center" justify={['center', 'space-between']}
                    w={['100%', '100%']}
                >
                    <Link to={`/exam/${id}`}>
                        <Button colorScheme="yellow" size="sm" variant="solid" className='button-view'>
                            View Details
                        </Button>
                    </Link>
                    <Box w={['100%', '100%']}>
                        <Spacer display={['none', 'block']} />
                        {user && user?.examsEnrolled.find(exam => exam.exam === id) ? (
                            <Link to={`/exam/${id}`}>
                                <Button colorScheme="green" size="sm" variant="outline" className='button-view'>
                                    Attempt
                                </Button>
                            </Link>
                        ) : (
                            <Button colorScheme="green" size="sm" variant="outline" onClick={enrollForExam} className='button-view'>
                                Enroll
                            </Button>
                        )}
                    </Box>
                </Stack>
            </VStack>
        </>
    );
};

const Exams = () => {
    const [keyword, setKeyword] = useState('');
    const dispatch = useDispatch();
    const { loading, message, exams } = useSelector(state => state.exam);

    useEffect(() => {
        dispatch(getAllExams(keyword));
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [message, dispatch, keyword]);

    return (
        <Container minH="95vh" maxW="container.lg" paddingY="8">
            <React.Fragment>
                <Heading m="8">
                    Exams
                </Heading>
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Search Exams..."
                    type="text"
                    focusBorderColor="yellow.500"
                />
                <Stack
                    direction={['column', 'row']}
                    flexWrap="wrap"
                    justifyContent={['flex-start', 'space-evenly']}
                    alignItems={['center', 'flex-start']}
                >
                    {exams?.length > 0 ? (
                        exams?.map((exam, index) => (
                            <ExamCard
                                key={index}
                                name={exam.name}
                                id={exam._id}
                                loading={loading}
                                price={exam.price}
                            />
                        ))
                    ) : (
                        <Heading mt="4">No Exams Found</Heading>
                    )}
                </Stack>
            </React.Fragment>
        </Container>
    );
};

export default Exams;
