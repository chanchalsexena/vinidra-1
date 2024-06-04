import React, { useState, useEffect } from 'react';
import { Container, Heading, VStack, Input, Button, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { changePassword } from '../../store/action/profileAction';
import { loadUser } from '../../store/action/userAction';
import PageTitle from '../../PageTitle';
const ChangePassword = () => {
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state.profile);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [show, setShow] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(changePassword(oldPassword, newPassword));
        dispatch(loadUser());
    };
    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [message, dispatch]);
    return (
        <React.Fragment>
            <PageTitle title="Change Password" />
            <Container minH="88vh" py={5}>
                <form onSubmit={submitHandler}>
                    <Heading my={16} textAlign={['center', 'left']} textTransform="uppercase">Change Password</Heading>
                    <VStack spacing="8">
                        <InputGroup
                            w="full"
                            mx={8}
                            my={4}
                        >
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder="Enter Old Password"
                                value={oldPassword}
                                required
                                onChange={(e) => setOldPassword(e.target.value)}
                                focusBorderColor="yellow.500"
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup
                            w="full"
                            mx={8}
                            my={4}
                        >
                            <Input
                                type={show ? 'text' : 'password'}
                                placeholder="Enter New Password"
                                value={newPassword}
                                required
                                onChange={(e) => setNewPassword(e.target.value)}
                                focusBorderColor="yellow.500"
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button
                            type="submit"
                            colorScheme="yellow"
                            size="md"
                            w="full"
                            mt={8}
                            mx={8}
                            borderRadius={20}
                            isLoading={loading}
                        >
                            Change Password
                        </Button>
                    </VStack>
                </form>
            </Container>
        </React.Fragment>
    );
};
export default ChangePassword;