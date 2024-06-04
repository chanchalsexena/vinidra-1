import { useState, useMemo } from 'react';
import { Container, Heading, Box, Button, FormLabel, VStack, Input } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { requestCourse } from '../../store/action/contactAction';
import PageTitle from '../../PageTitle';
const Request = () => {
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state.contact);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(requestCourse({ name, email, course }));
        setName('');
        setEmail('');
        setCourse('');
    };
   
    useMemo(() => {
        if (message) { toast.success(message); dispatch({ type: 'clearMessage' }); }
    }, [dispatch, message]);
    return (
        <> 
            <PageTitle title="Request New Course" />
            <Container height="92vh">
                <VStack spacing={8} justifyContent="center" h="full">
                    <Heading>Request New Course</Heading>
                    <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                        <Box my={4}>
                            <FormLabel htmlFor="name">Name</FormLabel>
                            <Input
                                name="name"
                                type="text"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                                focusBorderColor="yellow.500"
                            />
                        </Box>
                        <Box my={4}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                name="email"
                                type="email"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                focusBorderColor="yellow.500"
                            />
                        </Box>
                        <Box my={4}>
                            <FormLabel htmlFor="course">Course</FormLabel>
                            <Input
                                name="course"
                                type="text"
                                value={course}
                                required
                                onChange={(e) => setCourse(e.target.value)}
                                focusBorderColor="yellow.500"
                            />
                        </Box>
                        <Button type="submit" colorScheme="yellow" size="sm" borderRadius={8} isLoading={loading}>
                            Send Mail
                        </Button>
                        <Box my={4}>
                            See available Courses! <Link to="/courses"><Button variant="link" size="sm" borderRadius={8}>Courses</Button> {' '} here</Link>
                        </Box>
                    </form>
                </VStack>
            </Container>
       </>
    );
};

export default Request;