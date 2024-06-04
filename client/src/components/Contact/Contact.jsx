import { useState, useEffect } from 'react';
import { Container, VStack, Heading, Box, FormLabel, Input, Button, Textarea } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { contactUs } from '../../store/action/contactAction';
import PageTitle from '../../PageTitle';
const Contact = () => {
    const dispatch = useDispatch();
    const { loading, message: mess } = useSelector((state) => state.contact);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (mess) { toast.success(mess); dispatch({ type: 'clearMessage' }); }
    }, [mess, dispatch]);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(contactUs({ name, email, message }));
        setName('');
        setEmail('');
        setMessage('');
    };
    return (
        <>
            <PageTitle title="Contact Us" />
            <Container height="95vh">
                <VStack h="full" justifyContent="center">
                    <Heading textTransform="uppercase" my="5" textAlign={['center', 'left']}>Contact Us</Heading>
                    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <Box my="4">
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} focusBorderColor="yellow.500" />
                        </Box>
                        <Box my="4">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} focusBorderColor="yellow.500" />
                        </Box>
                        <Box my="4">
                            <FormLabel htmlFor="message">Message</FormLabel>
                            <Textarea placeholder="Enter your message" required value={message} onChange={(e) => setMessage(e.target.value)} focusBorderColor="yellow.500" />
                        </Box>
                        <Button type="submit" colorScheme="yellow" mt="4" borderRadius={8} size="sm" isLoading={loading}>
                            Send Mail
                        </Button>
                        <Box my="4">
                            Request for a course ? <Link to="/request"><Button variant="link" fontSize="sm">Click here</Button>{' '}to request a course</Link>
                        </Box>
                    </form>
                </VStack>
            </Container>
        </>
    );
};

export default Contact;