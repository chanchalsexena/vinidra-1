import { Container, Heading, VStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';

const PaymentFailed = () => (
    <Container p={16} h="88vh">
        <VStack justifyContent="center" h="full" spacing={4}>
            <RiErrorWarningFill size="5rem" />
            <Heading my={8} textAlign="center" textTransform="uppercase">
                Payment Failed
            </Heading>
            <Link to="/subscribe">
                <Button colorScheme="yellow" my={8} w="full" borderRadius={20}>
                    Try Again
                </Button>
            </Link>
        </VStack>
    </Container>
);

export default PaymentFailed;