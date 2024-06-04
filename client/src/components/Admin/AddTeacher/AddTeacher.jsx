import { useState, useEffect } from 'react';
import { VStack, Box, Heading, Button, Input, FormControl, FormLabel, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { createTeacher } from '../../../store/action/adminAction';
import { useSelector, useDispatch } from 'react-redux';
import Layout from '../DashBoard/Layout';
import PageTitle from '../../../PageTitle';
const AddTeacher = () => {
    const dispatch = useDispatch();
    const { loading, message, error } = useSelector(state => state.admin);
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        fullname: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTeacher(form))
            .then(() => {
                setForm({ username: '', email: '', password: '' });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearErrors' });
        }
    }, [message, dispatch, error]);

    return (
        <>
            <PageTitle title="Add Teacher" />
            <Layout>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ flex: 1 }}
                >
                    <VStack spacing={4} paddingY="8" paddingX="4" h={{ base: '100%', md: '80vh' }} justify="center" align="center">
                        <Heading>Add Teacher</Heading>
                        <div style={{ width: '400px' }}>
                            <Box p={4} boxShadow="md" borderRadius="md" width="100%">
                                <FormControl isRequired>
                                    <FormLabel>Username</FormLabel>
                                    <Input type="text" name="username" value={form.username} onChange={handleInputChange} placeholder='name@1234' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Email</FormLabel>
                                    <Input type="email" name="email" value={form.email} onChange={handleInputChange} placeholder='abc@gmail.com' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input type="text" name="fullname" value={form.fullname} onChange={handleInputChange} placeholder='John Doe' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input type={showPassword ? 'text' : 'password'} name="password" value={form.password} onChange={handleInputChange} />
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
                                                {showPassword ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>
                                {error && <Text color="red.500">{error}</Text>}
                            </Box>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{ textAlign: 'center' }}
                            >
                                <Button colorScheme="purple" onClick={handleSubmit} disabled={loading} marginTop={4} width="100%" borderRadius="md" size="md" type="submit" isLoading={loading} loadingText="Adding..." >
                                    {loading ? 'Adding...' : 'Add Teacher'}
                                </Button>
                            </motion.div>
                        </div>
                    </VStack>
                </motion.div>
            </Layout>
       </>
    );
};

export default AddTeacher;
