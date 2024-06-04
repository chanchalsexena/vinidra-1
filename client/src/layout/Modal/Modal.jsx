import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Input } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ResendTokenModal = ({ isOpen, onClose, onClick }) => {
    const [email, setEmail] = useState('');

    const handleClick = () => {
        onClick(email);
        setEmail('');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Resend Token</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} focusBorderColor="yellow.500" />
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleClick}>
                        Resend
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

ResendTokenModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ResendTokenModal;
