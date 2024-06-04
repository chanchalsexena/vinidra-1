import { motion } from 'framer-motion';
import { Container, Heading, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import PageTitle from '../../PageTitle';
const ExamPaymentSuccessful = () => {
    return (
        <>
            <PageTitle title="Payment Successful" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Container textAlign="center">
                    <Heading as="h2" size="xl" mb={4}>
                        Payment Successful
                    </Heading>
                    <Text fontSize="lg">Your payment has been processed successfully.</Text>
                    <Text fontSize="lg">You can now access the exam.</Text>
                    <Link to="/exams">
                        <Text fontSize="lg" color="yellow.500" mt={4}>
                            Go to Exams
                        </Text>
                    </Link>
                </Container>

            </motion.div>
       </>
    );
};

export default ExamPaymentSuccessful;
