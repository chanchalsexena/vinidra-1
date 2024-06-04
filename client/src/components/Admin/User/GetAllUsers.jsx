/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
    VStack,
    Box,
    Heading,
    Center,
    Spinner,
    Input,
    Select,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    ModalCloseButton,
    Textarea,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast
} from '@chakra-ui/react';
import { FaEdit, FaTrash, FaMailBulk } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { getAllUsers, deleteUser, changeRole, sendMailToOne } from "../../../store/action/adminAction";
import Layout from '../DashBoard/Layout';
import PageTitle from "../../../PageTitle";
const GetAllUsers = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isSendMailModalOpen, setIsSendMailModalOpen] = useState(false);
    const [mailSubject, setMailSubject] = useState('');
    const [mailMessage, setMailMessage] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const toast = useToast();
    const { users = [], loading, message, error, totalUsers } = useSelector(state => state.admin);

    useEffect(() => {
        dispatch(getAllUsers(page, limit, searchTerm, sortBy));
    }, [dispatch, page, limit, searchTerm, sortBy]); 

    useEffect(() => {
        if (message) {
            toast({
                position: "top-right",
                title: "Success",
                description: message,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            dispatch({ type: 'clearMessage' });
        }
        if (error) {
            toast({
                position: "top-right",
                title: "Error",
                description: error,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            dispatch({ type: 'clearErrors' });
        }
    }, [message, error, dispatch, toast]);

    useEffect(() => {
        setTotalPages(Math.ceil(totalUsers / limit));
        setCurrentPage(page);
    }, [totalUsers, limit, page]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setPage(1);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setIsDeleteModalOpen(true);
    };

    const handleEditConfirmation = async (e) => {
        e.preventDefault();
        const updatedRole = selectedUser.role;
        await dispatch(changeRole(selectedUser._id, updatedRole));
        setIsEditModalOpen(false);
        dispatch(getAllUsers(page, limit, searchTerm, sortBy));
    };

    const handleSendMailClick = (user) => {
        setSelectedUser(user);
        setIsSendMailModalOpen(true);
    };

    const handleSendMailConfirmation = async (e) => {
        e.preventDefault();
        if (!mailSubject || !mailMessage) {
            toast({
                position: "top-right",
                title: "Error",
                description: "Please fill all fields",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        if (!selectedUser) {
            toast({
                position: "top-right",
                title: "Error",
                description: "Please select a user",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const userId = selectedUser._id;
        await dispatch(sendMailToOne(userId, mailSubject, mailMessage));
        setIsSendMailModalOpen(false);
    };

    const handleDeleteConfirmation = async (e) => {
        e.preventDefault();
        await dispatch(deleteUser(selectedUser._id));
        setIsDeleteModalOpen(false);
        dispatch(getAllUsers(page, limit, searchTerm, sortBy));
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        setPage(newPage);
    }
    return (
        <>
            <PageTitle title="All Students" />
            <Layout>
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ flex: 1 }}
                >
                    <Center>
                        <Box display="flex" minW={["100%", "60%"]} mt={4}>
                            <Box flex="3" ml={4} p={4} boxShadow={"md"} rounded="md" w="100%">
                                <VStack align="start" spacing={4}>
                                    <Heading size="lg" textAlign={"center"}>All Users</Heading>
                                    <Box boxShadow="md" p={4} rounded="md" w="100%">
                                        <Box mb={4}>
                                            <Input placeholder="Search by email" value={searchTerm} onChange={handleSearchChange} />
                                            <Select placeholder="Sort by" value={sortBy} onChange={handleSortChange} mt={2}>
                                                <option value="username">Username</option>
                                                <option value="email">Email</option>
                                            </Select>
                                        </Box>
                                        <Table variant="simple" colorScheme="gray" size="md">
                                            <Thead>
                                                <Tr>
                                                    <Th>Username</Th>
                                                    <Th>Fullname</Th>
                                                    <Th>Email</Th>
                                                    <Th>Actions</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {users?.map((user, index) => (
                                                    <Tr key={index}>
                                                        <Td>{user.username}</Td>
                                                        <Td>{user.fullname}</Td>
                                                        <Td>{user.email}</Td>
                                                        <Td>
                                                            <IconButton
                                                                colorScheme="blue"
                                                                aria-label="Edit"
                                                                icon={<FaEdit />}
                                                                onClick={() => handleEditClick(user)}
                                                                mr={2}
                                                            />
                                                            <IconButton
                                                                colorScheme="red"
                                                                aria-label="Delete"
                                                                icon={<FaTrash />}
                                                                onClick={() => handleDeleteClick(user)}
                                                                mr={2}
                                                            />
                                                            <IconButton
                                                                colorScheme="green"
                                                                aria-label="Send Mail"
                                                                icon={<FaMailBulk />}
                                                                onClick={() => handleSendMailClick(user)}
                                                            />
                                                        </Td>
                                                    </Tr>
                                                ))}

                                            </Tbody>
                                        </Table>
                                        {loading && <Center mt={4}><Spinner size="lg" /></Center>}
                                        <Center mt={4}>
                                            <Button
                                                colorScheme="blue"
                                                size="sm"
                                                disabled={page === 1}
                                                onClick={() => handlePageChange(page - 1)}
                                                leftIcon={<BiChevronLeft />}
                                            >
                                                Previous
                                            </Button>
                                            <Text mx={4}>Page {currentPage} of {totalPages}</Text>
                                            <Button
                                                colorScheme="blue"
                                                size="sm"
                                                disabled={page === totalPages}
                                                onClick={() => handlePageChange(page + 1)}
                                                rightIcon={<BiChevronRight />}
                                            >
                                                Next
                                            </Button>
                                        </Center>
                                    </Box>
                                </VStack>
                            </Box>
                        </Box>
                    </Center>
                </motion.div>
                <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Role</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Select value={selectedUser?.role} onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}>
                                <option value="">Select Role</option>
                                <option value="teacher">Teacher</option>
                                <option value="admin">Admin</option>
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={handleEditConfirmation} m={4}>Save</Button>
                            <Button colorScheme="red" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Delete User</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text>Are you sure you want to delete {selectedUser?.username}?</Text>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="red" onClick={handleDeleteConfirmation} m={4}>Delete</Button>
                            <Button colorScheme="blue" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={isSendMailModalOpen} onClose={() => setIsSendMailModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Send Mail</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Input placeholder="Subject" value={mailSubject} onChange={(e) => setMailSubject(e.target.value)} />
                            <Textarea placeholder="Message" value={mailMessage} onChange={(e) => setMailMessage(e.target.value)} mt={2} />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" onClick={handleSendMailConfirmation} m={4}
                                isLoading={loading}
                            >Send</Button>
                            <Button colorScheme="red" onClick={() => setIsSendMailModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Layout>
       </>
    );

}

export default GetAllUsers;
