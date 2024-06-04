/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Container, Heading, Button, VStack, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../store/action/profileAction';
import { loadUser } from '../../store/action/userAction';
import PageTitle from '../../PageTitle';
const UpdateProfile = ({ user }) => {
    const [username, setUserName] = useState(user?.username);
    const [email, setEmail] = useState(user?.email);
    const [fullname, setFullname] = useState(user?.fullname);
    const { message, loading } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [message, dispatch]);
    const submitHandler = async (e) => {
        e.preventDefault();
        const form = {};
        if (username) form.username = username;
        if (email) form.email = email;
        if (fullname) form.fullname = fullname;
        await dispatch(updateProfile(form));
        dispatch(loadUser());
        navigate('/profile');
    };


    return (
        <React.Fragment>
            <PageTitle title={`${user?.fullname}'s Profile`} />
            <Toaster />
            <Container minH="88vh" py={5}>
                <Heading my={16} textAlign={['center', 'left']} textTransform="uppercase">Update Profile</Heading>
                <form onSubmit={submitHandler}>
                    <VStack spacing="8">
                        <Input
                            type="text"
                            placeholder="Name"
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                            focusBorderColor="yellow.500"
                        />
                        <Input
                            type="text"
                            placeholder="Full Name"
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                            focusBorderColor="yellow.500"
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            focusBorderColor="yellow.500"
                        />
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
                            Update Profile
                        </Button>
                    </VStack>
                </form>
            </Container>
        </React.Fragment>
    );
};





export default UpdateProfile;