import {
  Heading,
  Text,
  Button,
  Box,
  Grid,
  GridItem,
  Image,
  HStack,
  Flex,
  Card,
  CardHeader,
  CardBody /*, CardFooter, Divider, ButtonGroup, Stack, Highlight, Avatar, useColorModeValue,useMediaQuery */,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
// import { CgGoogle, CgInstagram, CgYoutube } from 'react-icons/cg';
// import { SiCoursera, SiUdemy } from 'react-icons/si';
// import { DiAws } from 'react-icons/di';
import vg from "../../assets/images/bg.jpg";
import introVideo from "../../assets/videos/intro.mp4";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getHomeData } from "../../store/action/homeAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../PageTitle";
import { getFaqs } from "../../store/action/faqAction";
// import /* React, */ { useState } from 'react';
// import { Button, Flex } from '@chakra-ui/react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import { FaChevronRight } from 'react-icons/fa';
// import styled from 'styled-components';
import ExamType from "./ExamType";
// import { Grid } from '@chakra-ui/react';
import HoverBox from "./HoverBox";
// import { extendTheme } from '@chakra-ui/react';

// const theme = extendTheme({
//   colors: {
//     custom: '#631fe2',
//   },
// });
const Home = () => {
  // const TransparentCard = ({ Name, Image }) ;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { home } = useSelector((state) => state.home);
  // const [isHovered, setIsHovered] = useState(false);

  // const { data} = useSelector(state => state.faq);
  useEffect(() => {
    dispatch(getHomeData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getFaqs());
  }, [dispatch]);

  const imageSrcs = [
    "https://res.cloudinary.com/dwddhs9io/image/upload/v1712986831/Vinidra/Picsart_24-04-13_11-09-43-411_zrnlce.png",
    "https://res.cloudinary.com/dwddhs9io/image/upload/v1712986832/Vinidra/Picsart_24-04-13_11-09-01-041_rppwwa.png",
    "https://res.cloudinary.com/dwddhs9io/image/upload/v1712986832/Vinidra/Picsart_24-04-13_11-09-13-442_vo1ppb.png",
    "https://res.cloudinary.com/dwddhs9io/image/upload/v1712986831/Vinidra/Picsart_24-04-13_11-09-25-378_a2db9h.png",
    "https://res.cloudinary.com/dwddhs9io/image/upload/v1712986831/Vinidra/Picsart_24-04-13_11-09-34-475_nwckwu.png",
  ];

  return (
    <>
      <PageTitle title="Home" />
      <Box
        as="section"
        className="home unselectable"
        minH={{ base: "100vh", md: "80vh" }}
        overflow={"hidden"}
      >
        <Grid
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={8}
          h={{ base: "auto", md: "100vh" }}
        >
          <GridItem
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box py={{ base: 8, md: 16 }} px={{ base: 4, md: 8 }}>
              <Heading
                size="2xl"
                mb={4}
                textAlign={{ base: "center", md: "left" }}
              >
                {home[0]?.title}
              </Heading>
              <Heading
                bgGradient="linear(to-l, #4715A2, #FF0080)"
                bgClip="text"
                fontSize="5xl"
                fontWeight="extrabold"
                size="2xl"
                mb={4}
                textAlign={{ base: "center", md: "left" }}
              >
                {user?.fullname}
              </Heading>

              <Text
                fontSize="xl"
                fontFamily="cursive"
                mb={6}
                textAlign={{ base: "center", md: "left" }}
              >
                {home[0]?.description}
              </Text>
              <Flex justifyContent="space-between" alignItems="center">
                <Link to="/exams">
                  <Button
                    size="lg"
                    colorScheme="custom"
                    bg="#631fe2"
                    borderRadius="20px"
                    mx={{ base: "auto", md: 0 }}
                    display="block"
                    mr="5px"
                  >
                    Explore Exams
                  </Button>
                </Link>
                <Link to="/courses">
                  <Button
                    size="lg"
                    colorScheme="teal"
                    borderRadius="20px"
                    mx={{ base: "auto", md: 0 }}
                    display="block"
                    variant="outline"
                  >
                    Explore Courses
                  </Button>
                </Link>
              </Flex>
            </Box>
          </GridItem>
          <GridItem position="relative">
            <Flex
              justifyContent="center"
              alignItems="center"
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
            >
              <Box w="80%" h="80%" borderRadius="full" overflow="hidden">
                <Image src={home[0]?.image?.url || vg} mt="6rem" />
              </Box>
            </Flex>
          </GridItem>
        </Grid>

        <Flex
          direction="column"
          alignItems="center"
          justifyContent="center"
          h="75vh"
          bg=""
        >
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            h="80vh"
            bg=""
          >
            <Image
              src="https://res.cloudinary.com/dwddhs9io/image/upload/v1712231839/Vinidra/c1gadgoaokcjv3afjsxm.png"
              alt=""
              w="100%"
              maxW="400px"
            />
            <Flex
              direction="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              px="6"
            >
              <Text fontSize="4xl" fontWeight="bold" color="#4715A2" mb="4">
                VOYAGE OF PROMISING
                <br /> FUTURE
              </Text>

              <Text fontSize="lg" color="gray.600" mb="6">
                Welcome to Vinidra, your one-stop destination for seamless
                online exam-taking experiences. Whether you&apos;re a student
                preparing for an upcoming test or an educator looking to assess
                your students&apos; progress, Vinidra is here to make the
                process easier, more efficient, and more enjoyable.
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* //courcess part */}

        <Box py={8} bg="blackAlpha.00" textAlign="center" mt={8} mx={-8} p={8}>
          <Heading
            bgColor="#631fe2"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
          >
            Exam Categories
          </Heading>
        </Box>

        <Text fontSize="lg" textAlign="center" color="gray.600" mb="6">
          VINIDRA is preparing students for various exam categories. Scroll down
          to find the one you are preparing for
        </Text>

        {/* /*----------------------------------------------------------------exam section */
        /*   */}

        <Grid
          marginLeft="30px"
          spacing={8}
          templateColumns="repeat(auto-fill, minmax(350px, 1fr))"
          gap={5}
        >
          <ExamType
            exam={{
              name: "NEET",
              image:
                "https://res.cloudinary.com/dwddhs9io/image/upload/v1712917967/Vinidra/Untitled_design_20240412_160025_0000_uppfdv.png",
            }}
            grades={["11th", "12th", "Dropper"]}
          />
          {/* Add more ExamType components here */}
          <ExamType
            exam={{
              name: "JEE",
              image:
                "https://res.cloudinary.com/dwddhs9io/image/upload/v1712939564/Vinidra/20240412_220146_0000_i52m1n.png",
            }}
            grades={["11th", "12th", "Dropper"]}
          />

          <ExamType
            exam={{
              name: "School Preparation",
              image:
                "https://res.cloudinary.com/dwddhs9io/image/upload/v1712940765/Vinidra/20240412_220947_0000_xq0o1o.png",
            }}
            grades={["6th", "7th", "8th", "9th", "10th"]}
          />

          <ExamType
            exam={{
              name: "Govt Job Exams",
              image:
                "https://res.cloudinary.com/dwddhs9io/image/upload/v1712940764/Vinidra/20240412_221157_0000_hlmlp4.png",
            }}
            grades={["SSC", "BANKING", "TEACHING"]}
          />

          <ExamType
            exam={{
              name: "Defence",
              image:
                "https://res.cloudinary.com/dwddhs9io/image/upload/v1712940764/Vinidra/20240412_222035_0000_px63ye.png",
            }}
            grades={["NDA", "CDS", "AFCAT"]}
          />

          <ExamType
            exam={{
              name: "STATE BOARD",
              image:
                "https://res.cloudinary.com/dwddhs9io/image/upload/v1712940764/Vinidra/20240412_222208_0000_pxfuug.png",
            }}
            grades={["BIHAR", "JHARKHAND", "UP"]}
          />
          <ExamType
            exam={{
              name: "COMPUTER SCIENCE",
              image:
                "https://res.cloudinary.com/dwddhs9io/image/upload/v1713007280/Vinidra/20240413_164655_0000_wbnq9w.png",
            }}
            grades={["BCA", "MCA", "PGDCA"]}
          />

          <ExamType
            exam={{
              name: "STATE COMBINE ENTRANCE",
              image:
                "https://res.cloudinary.com/dwddhs9io/image/upload/v1713007279/Vinidra/20240413_164955_0000_pevobm.png",
            }}
            grades={["JCECE", "UPCET", "DUET"]}
          />
        </Grid>

        {/* <Box>
      <Grid marginLeft="30px" spacing={8} templateColumns='repeat(auto-fill, minmax(350px, 1fr))' gap={5}>
        {exams.map((exam, index) => (
          <ExamType
            exam={exam}
            key={exam.name}
            grades={grades[index].grades}
          />
        ))}
      </Grid>
    </Box> */}

        {/* //exam section end */}

        <Card>
          <CardHeader>
            <Image
              src="https://res.cloudinary.com/dwddhs9io/image/upload/v1712974999/Vinidra/White_Online_Business_Webinar_Facebook_Cover_20240413_033446_0000_req1au.png"
              alt="Card Image"
              borderRadius="lg"
            />
            <Button
              position="absolute"
              bottom="10"
              left="50%"
              transform="translateX(-50%)"
              py={5}
              bg="blue.200"
            >
              CATCH THE DEAL
            </Button>
          </CardHeader>
          <CardBody>{/* Add content here */}</CardBody>
        </Card>

        {/* //what we offer// */}

        <Box>
          <Box py={8} bg="themecolor" textAlign="center" mt={8} mx={-8} p={8}>
            <Heading
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="4xl"
              fontWeight="extrabold"
            >
              What We Offer
            </Heading>
          </Box>
        </Box>

        <Grid templateColumns={{ base: "1fr", md: "repeat(5, 1fr)" }} gap={4}>
          {imageSrcs.map((src, index) => (
            <Card key={index}>
              <CardHeader>
                <Image src={src} alt="Card Image" borderRadius="lg" />
                {/* <Button position="absolute" bottom="10" left="50%" transform="translateX(-50%)" py={5} bg="BLUE">CATCH THE DEAL</Button> */}
              </CardHeader>
              <CardBody>{/* Add content here */}</CardBody>
            </Card>
          ))}
        </Grid>

        {/* //video// */}
        <Box py={8} bg="themecolor" textAlign="center" mt={8} mx={-8} p={8}>
          <Heading
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
            fontSize="4xl"
            fontWeight="extrabold"
          >
            A Platform Trusted by Students Worldwide
          </Heading>
          <HStack justifyContent="center" mt={4} spacing={8}></HStack>

          {/* //video// */}

          <Box py={8} textAlign="center" mt={8} mx={-8} p={8}>
            <Box maxW="container.lg" mx="auto">
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
          </Box>
        </Box>

        <Box py={8} textAlign="center" mt={8} mx={-8} p={8}>
          <Heading>Students ❤️ vinidra</Heading>
          <Text fontSize="lg" color="themecolor" mb="10">
            The Vinidra Is An Innovative Platform That Will Provide An
            Easy-To-Use And Secure Environment For Online Exams.
          </Text>
        </Box>

        <Box
          w="80%"
          marginLeft="10%"
          bg="themecolor"
          borderRadius="lg"
          p="4"
          boxShadow="lg"
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          flexDirection={["column", "row"]}
        >
          <Box w="100%" mb={[4, 0]}>
            <Image
              src="https://res.cloudinary.com/dwddhs9io/image/upload/v1712974997/Vinidra/Blue_Welcome_to_the_Library_Introduction_Video_20240413_034152_0000_agozmi.png"
              alt="card photo"
              borderRadius="lg"
              boxSize="100%"
            />
          </Box>
          <Box w="100%">
            <Heading size="md" mb="2">
              Get Started Today:
            </Heading>
            <Text mb="4">
              Signing up for Vinidra is quick, easy, and completely free. Join
              our community of learners and educators today to start your
              journey towards exam success. Whether you&apos;re a student,
              teacher, or lifelong learner, Vinidra is here to support you every
              step of the way.
            </Text>
          </Box>
        </Box>

        {/* //study resources// */}

        <Box py={8} textAlign="center" mt={8} mx={-8} p={8}>
          <Heading>Study Resources</Heading>
        </Box>

        <Grid
          spacing={70}
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap={10}
        >
          <HoverBox
            bgColor="red.100"
            imageSrc="https://res.cloudinary.com/dwddhs9io/image/upload/v1712974997/Vinidra/Blue_Welcome_to_the_Library_Introduction_Video_20240413_034152_0000_agozmi.png"
          >
            <Heading size="md" mb="2">
              NOTES
            </Heading>
            <Text mb="4">
              This is a card with some text and a photo in the lower part.
            </Text>
          </HoverBox>
          <HoverBox
            bgColor="blue.100"
            imageSrc="https://res.cloudinary.com/dwddhs9io/image/upload/v1712974997/Vinidra/Blue_Orange_3D_Class_Project_Education_Website_20240413_033721_0000_fkqn3j.png"
          >
            <Heading size="md" mb="2">
              NCERT Solutions
            </Heading>
            <Text mb="4">
              This is a card with some text and a photo in the lower part.
            </Text>
          </HoverBox>
          {/* Repeat the HoverBox component for each box in the grid */}
          <HoverBox
            bgColor="purple.100"
            imageSrc="https://example.com/image2.jpg"
          >
            <Heading size="md" mb="2">
              Reference Notes
            </Heading>
            <Text mb="4">
              This is a card with some text and a photo in the lower part.
            </Text>
          </HoverBox>
        </Grid>
      </Box>

      {/* //footer// */}
      <Box p={5} display={{ md: "flex" }}>
        <Box flexShrink={0}>
          <Image
            borderRadius="lg"
            width={{ md: 80 }}
            src="https://res.cloudinary.com/dwddhs9io/image/upload/v1712995246/Vinidra/Red_Modern_Sport_Event_Ticket_20240413_132928_0000_rr1wwu.png"
            alt="Woman paying for a purchase"
          />
        </Box>
        <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
          <Link
            mt={15}
            display="block"
            fontSize="lg"
            lineHeight="normal"
            fontWeight="semibold"
            href="www.vinidra.com"
          ></Link>
          <Text mt={2} color="gray.500">
            Join our upcoming exam event and unlock the opportunity to win
            exciting gifts! At Vinidra, we believe in rewarding dedication to
            learning, which is why we&apos;re thrilled to announce our special
            event. By participating in our exams, you not only challenge
            yourself and expand your knowledge but also stand a chance to
            receive amazing gifts as a token of appreciation.join our exam event
            today and embark on a journey of learning and rewards!
          </Text>
        </Box>
      </Box>
    </>
  );
};

Home.propTypes = {
  user: PropTypes.object,
};

export default Home;
