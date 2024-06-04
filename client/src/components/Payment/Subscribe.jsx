/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { server } from '../../store/store';
import { buySubscription } from '../../store/action/subscriptionAction';
import logo from '../../assets/images/logo.png';
import PageTitle from '../../PageTitle';
const Subscribe = ({ user }) => {
    const dispatch = useDispatch();
    const [key, setKey] = useState('');
    const { message: error, loading, subscriptionId } = useSelector((state) => state.subscription);
    const { message: err } = useSelector((state) => state.course);
    const subscribeHandler = async () => {
        const config = {
            header: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/razorpay-key`, config);
        setKey(data.key);
        dispatch(buySubscription());
    };
    useEffect(() => {
        if (error) { toast.error(error); dispatch({ type: 'clearMessage' }); }
        if (err) { toast.error(err); dispatch({ type: 'clearError' }); }
        if (subscriptionId) {
            const openPopup = () => {
                const options = {
                    key,
                    name: 'Vinidra Exam',
                    description: 'Get access to all premium content',
                    image: logo,
                    subscription_id: subscriptionId,
                    callback_url: `${server}/payment-verification`,
                    prefill: {
                        name: user?.username,
                        email: user?.email,
                        contact: '',
                    },
                    notes: {
                        address: 'Vinidra Exam',
                    },
                    theme: {
                        color: '#FFC800',
                    },
                };
                const razor = new window.Razorpay(options);
                razor.open();
            };
            openPopup();
        }
    }, [dispatch, error, user?.username, user?.email, key, subscriptionId, err]);
    return (
        <>
            <PageTitle title="Subscribe" />
            <Container p={16} h="95vh">
                <Heading my={8} textAlign="center">Subscribe</Heading>
                <VStack boxShadow="lg" alignItems="stretch" spacing={0} borderRadius="lg">
                    <Box
                        bg="yellow.400"
                        p={4}
                        css={{
                            borderRadius: '8px 8px 0 0'
                        }}
                    >
                        <Text color="black">
                            Pro Pack at &#8377; 299.00
                        </Text>
                    </Box>
                    <Box p={4}>
                        <VStack textAlign="center" spacing={8} mt={4} px={8}>
                            <Text>
                                Join the Pro Pack and get access to all the content
                            </Text>
                            <Heading size="md">
                                &#8377; 299 Only
                            </Heading>
                        </VStack>
                        <Button colorScheme="yellow" my={8} w="full" onClick={subscribeHandler} isLoading={loading}>
                            Buy Now
                        </Button>
                    </Box>
                    <Box
                        bg="blackAlpha.600"
                        p={4}
                        css={{
                            borderRadius: '0 0 8px 8px',
                        }}
                    >
                        <Heading size="sm" color="white" textTransform="uppercase">
                            100% Money Back Guarantee
                        </Heading>
                        <Text color="white" fontSize="xs">
                            Terms and Conditions apply
                        </Text>
                    </Box>
                </VStack>
            </Container>
      </>
    );
};

export default Subscribe;