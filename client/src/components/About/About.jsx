/* eslint-disable react/prop-types */
import { Avatar, Button, Container, Heading, Stack, Text, VStack, Box, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiSecurePaymentFill } from 'react-icons/ri';
import introVideo from '../../assets/videos/intro.mp4';
import terms from '../../assets/docs/termsAndCondition';
import PropsType from 'prop-types';
import PageTitle from '../../PageTitle';
const Founder = () => (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={8}>
        <VStack>
            <Avatar boxSize={['40', '48']} src="https://res.cloudinary.com/dy3aat3gk/image/upload/v1661821190/codingmania/profilepic/ud3inaqvkg9bcxuwjqmn.jpg" />
            <Text fontSize={['sm', 'md']} opacity={0.8}>
                Founder
            </Text>
        </VStack>
        <VStack justifyContent="center" alignItems="center">
            <Heading fontSize={['sm', 'md']}>
                Chanchal Sexena
            </Heading>
            <Text fontSize={['sm', 'md']} textAlign={['center', 'left']}>
                Vinidra is a platform where you can learn to code and share your knowledge with the world
                and can test your skills with our Premium Courses and face exams to group your skills.
            </Text>
        </VStack>
    </Stack>
);
const VideoPlayer = () => (
    <Box>
        <video
            autoPlay
            loop
            muted
            playsInline
            className="video"
            controls
            controlsList="nodownload noremoteplayback noloop nofullscreen"
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
        />
    </Box>
);
const TermsAndCondition = ({ data }) => (
    <Box>
        <Heading fontSize={['sm', 'md']} textAlign={['center', 'left']} my={4}>
            Terms and Conditions
        </Heading>
        <Box h="sm" p={4} overflowY="scroll">
            <Text fontSize={['sm', 'md']} textAlign={['center', 'left']} fontFamily="heading" letterSpacing="0.1em">
                {data}
            </Text>
            <Heading
                my={4}
                fontSize={['sm', 'md']}
            >
                Refund only applicable for cancellation within 7 days of the course start date.
            </Heading>
        </Box>
    </Box>
);




const About = () => (
    <>
        <PageTitle title="About Us" />
        <Container maxW="container.lg" padding={16} boxShadow="lg">
            <Heading textAlign={['center', 'left']}>About Us</Heading>
            <Founder />
            <Stack m="8" direction={['column', 'row']} alignItems="center">
                <Text fontSize={['sm', 'md']} fontFamily="cursive" textAlign={['center', 'left']}>
                    We are a team of developers who are passionate about teaching new technologies.
                    This is a Video Streaming platform where you can learn to code and share your knowledge
                    with the world with Premium Courses
                </Text>
                <Link to="/subscribe">
                    <Button variant="ghost" colorScheme="yellow">
                        Checkout our Premium Courses
                    </Button>
                </Link>
            </Stack>
            <VideoPlayer />
            <TermsAndCondition data={terms} />
            <HStack my={4} padding={4}>
                <RiSecurePaymentFill />
                <Heading
                    fontSize={['sm', 'xs']}
                    fontFamily="sans-serif"
                    textTransform="uppercase"
                >
                    Payment is secure by RazorPay
                </Heading>
            </HStack>
        </Container>
   </>
);
TermsAndCondition.PropsType = {
    data: PropsType.string.isRequired
};
export default About;