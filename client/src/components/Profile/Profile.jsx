/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Avatar, Button, Container, Heading, HStack, Image, Modal, ModalOverlay, Stack, Text, VStack, ModalCloseButton, ModalContent, ModalBody, ModalHeader, Input, ModalFooter, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { TiTick } from 'react-icons/ti';
import { FcCancel } from 'react-icons/fc';
import { fileUploadCss } from './FileUpload';
import { updateAvatar } from '../../store/action/profileAction';
import { loadUser } from '../../store/action/userAction';
import { removeFromPlaylist } from '../../store/action/courseAction';
import { cancelSubscription } from '../../store/action/subscriptionAction';
import PageTitle from '../../PageTitle';
const Profile = ({ user }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state?.profile);
    const { loading: isLoading, message } = useSelector((state) => state?.course);
    const { loading: load, message: mess } = useSelector((state) => state?.subscription);
    useEffect(() => {
        if (message) { toast.success(message); dispatch({ type: 'clearMessage' }); }
        if (mess) { toast.success(mess); dispatch({ type: 'clearMessage' }); }
    }, [message, mess, dispatch]);
    const removeFromPlaylistHandler = async (id) => {
        await dispatch(removeFromPlaylist(id));
        dispatch(loadUser());
    };
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onClose: onClose2 } = useDisclosure();
    const changeImageHandler = async (e, image) => {
        e.preventDefault();
        const form = new FormData();
        form.append('file', image);
        await dispatch(updateAvatar(form));
        dispatch(loadUser());
    };
    const cancelSubscriptionHandler = async () => {
        await dispatch(cancelSubscription());
        dispatch(loadUser());
    };
    return (
        <>
            <PageTitle title={`${user?.fullname}'s Profile`} />
            <Container maxWidth="container.lg" minH="95vh" py={8}>
                <Heading m={8} textTransform="uppercase"> Profile </Heading>
                <Stack
                    justifyContent="flex-start"
                    direction={['column', 'row']}
                    alignItems="center"
                    spacing={['8', '16']}
                    p={8}
                >
                    <VStack>
                        <Avatar boxSize="48" src={`${user?.avatar?.url}`} />
                        <Button colorScheme="yellow" variant="ghost" onClick={onOpen}>
                            Change Photo
                        </Button>
                    </VStack>
                    <VStack spacing={4} alignItems={['center', 'flex-start']}>
                        <HStack>
                            <Text fontWeight="bold">Name : </Text>
                            <Text>{user?.username}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Full Name</Text>
                            <Text>{user?.fullname}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Email : </Text>
                            <Text>{user?.email}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Created At : </Text>
                            <Text>{user?.createdAt.split('T')[0]}</Text>
                        </HStack>
                        {user?.role === 'admin' && (
                            <HStack>
                                <Text fontWeight="bold">Role : </Text>
                                <Text>{user?.role}</Text>
                            </HStack>
                        )}
                        {user.role !== 'admin' && (
                            <HStack>
                                <Text fontWeight="bold">Subscription :</Text>
                                {user?.subscription && user?.subscription?.status === 'active' ? (
                                    <Button onClick={onOpen2} isLoading={load} color="red" variant="ghost">
                                        Cancel Subscription
                                    </Button>
                                ) : (
                                    <Button as={Link} to="/subscribe" colorScheme="yellow" variant="solid">
                                        Subscribe
                                    </Button>
                                )}
                            </HStack>
                        )}
                        <Stack direction={['column', 'row']} alignItems="center">
                            <Button as={Link} to="/updateprofile">Update Profile</Button>
                            <Button as={Link} to="/changepassword">Change Password</Button>
                        </Stack>
                    </VStack>
                </Stack>
                <Heading size="md" my={8}>
                    Playlist
                </Heading>
                {user?.playlist?.length > 0 && (
                    <Stack direction={['column', 'row']} alignItems="center" flexWrap="wrap" p={4}>
                        {user?.playlist.map((item, i) => (
                            <VStack w="48" m="2" key={i}>
                                <Image boxSize="full" objectFit="contain" src={item?.poster} />
                                <HStack>
                                    <Link to={`/course/${item?.course}`}>
                                        <Button variant="ghost" colorScheme="yellow">
                                            Watch now
                                        </Button>
                                    </Link>
                                    <Button onClick={() => removeFromPlaylistHandler(item?.course)} variant="ghost" isLoading={isLoading} colorScheme="red">
                                        <RiDeleteBin7Fill />
                                    </Button>
                                </HStack>
                            </VStack>
                        ))}
                    </Stack>
                )}
                <ChangePhotoBox isOpen={isOpen} onClose={onClose} onOpen={onOpen} changeImageHandler={changeImageHandler} loading={loading} />
                <CancelSubscriptionModal isOpen2={isOpen2} onClose2={onClose2} onOpen2={onOpen2} cancelSubscriptionHandler={cancelSubscriptionHandler} load={load} />
            </Container>
        </>
    );
};

export default Profile;
const ChangePhotoBox = ({ isOpen, onClose, changeImageHandler, loading }) => {
    const [image, setImage] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const changeImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };
    const closeHandler = () => {
        onClose();
        setImagePrev('');
        setImage('');
    };

    return (
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay backdropFilter="blur(10px)">
                <ModalContent>
                    <ModalHeader>Change Photo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Container>
                            <form onSubmit={(e) => changeImageHandler(e, image)}>
                                <VStack spacing={8}>
                                    {imagePrev && (<Avatar boxSize="48" src={imagePrev} />)}
                                    <Input type="file" css={{ '&::file-selector-button': fileUploadCss }} onChange={changeImage} />
                                    <Button w="full" isLoading={loading} type="submit" colorScheme="yellow">Upload </Button>
                                </VStack>
                            </form>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={closeHandler}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    );
};

const CancelSubscriptionModal = ({ onClose2, cancelSubscriptionHandler, isOpen2, load }) => (
    <Container w="80vw">
        <Modal isOpen={isOpen2} onClose={onClose2}>
            <ModalOverlay backdropFilter="blur(10px)">
                <ModalContent>
                    <ModalHeader color="orangered">Cancel Subscription ?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Heading fontSize={['sm', 'md']} opacity={0.9}>Are you sure want to cancel the subscription?</Heading>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} onClick={onClose2} borderRadius="lg">
                            <FcCancel />
                        </Button>
                        <Button variant="ghost" onClick={cancelSubscriptionHandler} isLoading={load}>
                            <TiTick />
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ModalOverlay>
        </Modal>
    </Container>
);