import { motion } from 'framer-motion';
import { Container, Heading, Text } from '@chakra-ui/react';
import PageTitle from '../../PageTitle';
const ExamPaymentFailure = () => {
    return (
        <>
            <PageTitle title="Payment Failed" />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Container textAlign="center">
                    <Heading as="h2" size="xl" mb={4} color="red.500">
                        Payment Failed
                    </Heading>
                    <Text fontSize="lg">Your payment was unsuccessful. Please try again.</Text>
                    {/* You can add more content or provide options to retry */}
                </Container>
            </motion.div>
       </>
    );
};

export default ExamPaymentFailure;
