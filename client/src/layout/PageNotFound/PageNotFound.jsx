
import { Container, Heading, VStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiErrorWarningFill } from 'react-icons/ri';
import PageTitle from '../../PageTitle';
const PageNotFound = () => {
    return (
        <>
            <PageTitle title="Page Not Found" />
            <Container p={16} h="88vh">
                <VStack justifyContent="center" h="full" spacing={4}>
                    <RiErrorWarningFill size="5rem" />
                    <Heading my={8} textAlign="center">
                        Page Not Found
                    </Heading>
                    <Link to="/">
                        <Button colorScheme="yellow" my={8} w="full" borderRadius={20}>
                            Go to Home
                        </Button>
                    </Link>
                </VStack>
            </Container>
        </>
    )
}

export default PageNotFound