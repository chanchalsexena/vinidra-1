import { useState, } from 'react';
import { Container, Heading, VStack, Input, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { forgetPassword } from "../../store/action/userAction";
import PageTitle from '../../PageTitle';
const ForgetPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.user);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgetPassword(email));
    };
    return (
        <>
            <PageTitle title="Forget Password" />
            <Container height="90vh" py={16}>
                <form onSubmit={handleSubmit}>
                    <Heading textTransform="uppercase" my="16" textAlign={['center', 'left']}>Forget Password</Heading>
                    <VStack spacing="8">
                        <Input type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} focusBorderColor="yellow.500" />
                        <Button type="submit" isLoading={loading} colorScheme="yellow" size="sm" mt="4" w="full">Send Reset Link</Button>
                    </VStack>
                </form>
            </Container>
        </>
    );
};

export default ForgetPassword;