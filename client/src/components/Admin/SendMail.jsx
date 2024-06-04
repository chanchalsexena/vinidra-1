import { useState, useEffect } from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailToAll } from '../../store/action/adminAction.js';
import Layout from './DashBoard/Layout.jsx';
const MotionButton = motion(Button);
import PageTitle from '../../PageTitle.jsx';
const SendMail = () => {
    const dispatch = useDispatch();
    const toast = useToast();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const { loading, message: mess, error } = useSelector(state => state.admin);

    const handleSubmit = async () => {
        if (!subject || !message) {
            toast({
                title: 'Error',
                description: 'Please fill all fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        dispatch(sendMailToAll(subject, message));

        setSubject('');
        setMessage('');

    };

    useEffect(() => {
        if (mess) {
            toast({
                position: 'top-right',
                title: 'Success',
                description: mess,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            dispatch({ type: 'clearMessage' });
        }
        if (error) {
            toast({
                position: 'top-right',
                title: 'Error',
                description: error,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            dispatch({ type: 'clearErrors' });
        }
    }, [mess, error, dispatch, toast]);

    return (
        <>
            <PageTitle title="Send Mail" />
            <Layout>
                <VStack style={{ height: "100dvh" }} display={"flex"} justifyContent={"center"} alignItems={"center"} spacing={4}>
                    <div style={{ height: "100dvh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "50%", padding: "4", gap: "10px" }}>
                        <FormControl id="subject">
                            <FormLabel>Subject</FormLabel>
                            <Input
                                type="text"
                                value={subject}
                                onChange={e => setSubject(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="message">
                            <FormLabel>Message</FormLabel>
                            <Input
                                type="text"
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                            />
                        </FormControl>
                        <MotionButton
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            colorScheme="teal"
                            onClick={handleSubmit}
                            isLoading={loading}
                            loadingText="Sending"
                        >
                            Send Mail To All
                        </MotionButton>
                    </div>
                </VStack>
            </Layout>
        </>
    );
};

export default SendMail;
