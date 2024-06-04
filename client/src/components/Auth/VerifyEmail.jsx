import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { verifyEmail } from "../../store/action/userAction";
import { Box, Button, Center, Heading, Text } from "@chakra-ui/react";
import Loader from "../../layout/Loader/Loader";
import { MdCheckCircle, MdErrorOutline } from 'react-icons/md';
import PageTitle from "../../PageTitle";
const VerifyEmail = () => {
    const dispatch = useDispatch();
    const { loading, message } = useSelector((state) => state.user);
    const { token } = useParams();
    const [verified, setVerified] = useState(false);

    const handleVerifyEmail = () => {
        if (message) {
            dispatch({ type: 'clearMessage' });
        }
        dispatch(verifyEmail(token));
        setVerified(true);
    };

    return (
        <>
            <PageTitle title="Verify Email" />
            <Center minHeight="100vh">
                <Box
                    width={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
                    padding="4"
                    borderWidth="1px"
                    borderRadius="lg"
                    boxShadow="lg"
                >
                    <Heading as="h1" size="lg" textAlign="center" marginBottom="4">Verify Email</Heading>
                    <Text textAlign="center" marginBottom="4">
                        {loading ? <Loader /> : message}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {verified ? (
                                <MdCheckCircle style={{ color: 'green', fontSize: '4em', marginRight: '0.5em' }} />
                            ) : (
                                <MdErrorOutline style={{ color: 'red', fontSize: '4em', marginRight: '0.5em' }} />
                            )}
                        </div>
                    </Text>
                    {!loading && !verified && (
                        <Button
                            onClick={handleVerifyEmail}
                            colorScheme="yellow"
                            width="100%"
                            borderRadius="8"
                            size="lg"
                        >
                            Verify Email
                        </Button>
                    )}
                    {!loading && verified && (
                        <Button
                            as={Link}
                            to="/"
                            colorScheme="yellow"
                            width="100%"
                            borderRadius="8"
                            size="lg"
                        >
                            Go to Home
                        </Button>
                    )}
                </Box>
            </Center>
        </>
    );
};

export default VerifyEmail;
