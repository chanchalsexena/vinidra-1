import { useState } from 'react';
import { Container, FormLabel, Heading, VStack, Button, Input, Box, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector, } from 'react-redux';
import { register, resendVerificationEmail } from "../../store/action/userAction";
import Modal from '../../layout/Modal/Modal';
import PageTitle from '../../PageTitle';
const Register = () => {
    const { loading, message } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState(''); 
    const [show, setShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('username', username);
        form.append('email', email);
        form.append('password', password);
        form.append('fullname', fullname);
        await dispatch(register(form));
        if (message) {
            setEmail('');
            setPassword('');
            setUsername('');
            setFullname('');
        }
    };


    const showPassword = () => setShow(!show);

    const handleResendEmail = (email) => {
        dispatch(resendVerificationEmail(email));
        setShowModal(false);
    };

    return (
        <>
            <PageTitle title="Register" />
            <Container height="95vh">
                <VStack height="full" justifyContent="center" spacing="8">
                    <Heading textTransform="uppercase">Register Here</Heading>
                    <form style={{ width: '100%' }} onSubmit={onSubmit}>
                        <Box my="4">
                            <FormLabel htmlFor="name">Username</FormLabel>
                            <Input type="text" placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} focusBorderColor="yellow.500" />
                        </Box>
                        <Box my="4">
                            <FormLabel htmlFor="name">Fullname</FormLabel>
                            <Input type="text" placeholder="Enter your fullname" required value={fullname} onChange={(e) => setFullname(e.target.value)} focusBorderColor="yellow.500" />
                        </Box>

                        <Box my="4">
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} focusBorderColor="yellow.500" />
                        </Box>
                        <Box my="4">
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <InputGroup>
                                <Input type={show ? 'text' : 'password'} id="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} focusBorderColor="yellow.500" />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={showPassword}>
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                        <Box>
                            <Button type="submit" colorScheme="yellow" mt="4" borderRadius={8} size="sm" isLoading={loading} disabled={loading}>
                                Sign Up
                            </Button>
                        </Box>
                        <Box my="4">
                            Already have an account ? <Link to="/login"><Button variant="link" fontSize="sm">Login</Button>{' '}here </Link>
                        </Box>
                        <Button onClick={() => setShowModal(true)}
                            variant="link"
                            fontSize="sm"
                            color="yellow.500"
                            _hover={{ textDecoration: 'underline' }}
                        >
                            Resend Verification Email
                        </Button>
                    </form>
                </VStack>

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onClick={handleResendEmail}
                />
            </Container>
       </>
    );
};

export default Register;
