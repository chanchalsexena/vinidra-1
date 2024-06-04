import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link, useSearchParams } from 'react-router-dom';
import PageTitle from '../../PageTitle';
const PaymentSuccess = () => {
    const reference = useSearchParams()[0].get('reference');
    return (
        <>
            <PageTitle title="Payment Success" />
            <Container p={16}>
                <Heading my={8} textAlign="center">You Have Pro Pack</Heading>
                <VStack boxShadow="lg" pb={16} alignItems="center" borderRadius="lg">
                    <Box
                        w="full"
                        bgColor="yellow.400"
                        p={4}
                        css={{
                            borderRadius: '8px 8px 0 0',
                        }}
                    >
                        <Text color="black">
                            Payment Successful
                        </Text>
                    </Box>
                    <Box p={4}>
                        <VStack textAlign="center" px={8} mt={4} spacing={8}>
                            <Text>
                                Congratulation you have successfully subscribed to Pro Pack
                            </Text>
                            <Heading size="4xl">
                                <RiCheckboxCircleFill />
                            </Heading>
                        </VStack>
                    </Box>
                    <Link to="/profile">
                        <Button colorScheme="yellow" my={8} w="full">
                            Go to Profile
                        </Button>
                    </Link>
                    <Heading size="xs">
                        Reference :{reference}
                    </Heading>
                </VStack>
            </Container>
       </>
    );
};

export default PaymentSuccess;