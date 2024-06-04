/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { VStack, Box, Heading, Text, Center, Spinner, Input, Select, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Textarea, Table, Thead, Tbody, Tr, Th, Td, IconButton, useToast } from '@chakra-ui/react';
import { FaEdit, FaMailBulk } from 'react-icons/fa';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { getAllAdmins, changeRole, sendMailToOne } from "../../store/action/adminAction.js";
import Layout from './DashBoard/Layout';
import PageTitle from "../../PageTitle.jsx";
const GetAllAdmins = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSendMailModalOpen, setIsSendMailModalOpen] = useState(false);
    const [mailSubject, setMailSubject] = useState('');
    const [mailMessage, setMailMessage] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const toast = useToast();
    const { admins = [], loading, message, error, totalAdmins } = useSelector(state => state.admin); 
    const { user } = useSelector(state => state.user);
    useEffect(() => {
        dispatch(getAllAdmins(page, limit, searchTerm, sortBy));
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
        setTotalPages(Math.ceil(totalAdmins / limit));
        setCurrentPage(page);
    }, [totalAdmins, limit, page]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSortBy(e.target.value);
        setPage(1);
    };

    const handleEditClick = (admin) => {
        setSelectedAdmin(admin);
        setIsEditModalOpen(true);
    };

    const handleEditConfirmation = async (e) => {
        e.preventDefault();
        const updatedRole = selectedAdmin.role;
        await dispatch(changeRole(selectedAdmin._id, updatedRole));
        setIsEditModalOpen(false);
        dispatch(getAllAdmins(page, limit, searchTerm, sortBy));
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
        if (!selectedAdmin) {
            toast({
                position: "top-right",
                title: "Error",
                description: "Please select an admin",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const adminId = selectedAdmin._id;
        await dispatch(sendMailToOne(adminId, mailSubject, mailMessage)).then(() => {
            setIsSendMailModalOpen(false);
            setMailSubject('');
            setMailMessage('');
        });
        setIsSendMailModalOpen(false);
    };

    const handleSendMailClick = (admin) => {
        setSelectedAdmin(admin);
        setIsSendMailModalOpen(true);
    };

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setPage(newPage);
    };

    return (
        <>
            <PageTitle title="All Admins" />
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
                                    <Heading size="lg">All Admins</Heading>
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
                                                    <Th>Full Name</Th>
                                                    <Th>Email</Th>
                                                    <Th>Actions</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {admins.map((admin, index) => (
                                                    <Tr key={index}>
                                                        <Td>{admin.username}</Td>
                                                        <Td>{admin.fullname}</Td>
                                                        <Td>{admin.email}</Td>
                                                        <Td>
                                                            <IconButton
                                                                colorScheme="green"
                                                                aria-label="Edit"
                                                                icon={<FaEdit />}
                                                                onClick={() => handleEditClick(admin)}
                                                                mr={2}
                                                            />
                                                            <IconButton
                                                                colorScheme="yellow"
                                                                aria-label="Send Mail"
                                                                icon={<FaMailBulk />}
                                                                onClick={() => handleSendMailClick(admin)}
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
                            <Text mb={4}>Change role of {selectedAdmin?.username}</Text>
                            <Select value={selectedAdmin?.role}
                                onChange={(e) => setSelectedAdmin({ ...selectedAdmin, role: e.target.value })}
                                disabled={selectedAdmin?.email === user.email}
                            >
                                <option value="">Select Role</option>
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </Select>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleEditConfirmation} m={4}>
                                Save
                            </Button>
                            <Button variant="ghost" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={isSendMailModalOpen} onClose={() => setIsSendMailModalOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Send Mail</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text mb={4}>Send mail to {selectedAdmin?.email}</Text>
                            <Input placeholder="Subject" value={mailSubject} onChange={(e) => setMailSubject(e.target.value)} />
                            <Textarea placeholder="Message" value={mailMessage} onChange={(e) => setMailMessage(e.target.value)} mt={4} />
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleSendMailConfirmation} m={4}
                                isLoading={loading} loadingText="Sending"
                            >
                                Send
                            </Button>
                            <Button variant="ghost" onClick={() => setIsSendMailModalOpen(false)}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Layout>
       </>
    );
}

export default GetAllAdmins;

