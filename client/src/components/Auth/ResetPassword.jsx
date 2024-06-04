import { useState, } from 'react';
import { Container, VStack, Input, Heading, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../store/action/userAction';
import PageTitle from '../../PageTitle';
const ResetPassword = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [show, setShow] = useState(false);
    const { token } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) { return toast.error('Password do not match.'); }
        dispatch(resetPassword(password, confirmPassword, token)).then(() => navigate('/login'));
    };
    return (
        <>
            <PageTitle title="Reset Password" />
            <Container height="90vh" py={16}>
                <form onSubmit={handleSubmit}>
                    <Heading textTransform="uppercase" my="16" textAlign={['center', 'left']}>Forget Password</Heading>
                    <VStack spacing="8">
                        <InputGroup>
                            <Input type={show ? 'text' : 'password'} placeholder="Enter Password" required value={password} onChange={(e) => setPassword(e.target.value)} focusBorderColor="yellow.500" />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup>
                            <Input type={show ? 'text' : 'password'} placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} focusBorderColor="yellow.500" />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>

                        <Button type="submit" colorScheme="yellow" isLoading={loading} size="sm" mt="4" w="full">Reset Password</Button>
                    </VStack>
                </form>
            </Container>
       </>
    );
};

export default ResetPassword;