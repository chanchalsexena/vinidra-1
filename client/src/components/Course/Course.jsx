/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Container, Heading, HStack, Input, Button, Text, Stack, VStack, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import "../Home/home.css";
import toast from 'react-hot-toast';
import { getAllCourses, addToPlaylist } from '../../store/action/courseAction';
import { loadUser } from '../../store/action/userAction';
import PageTitle from '../../PageTitle';
const CourseCard = ({ views, title, description, imageSrc, addToPlayListHandler, id, creator, lectureCount, loading }) => (
    <VStack className="course" alignItems={['center', 'flex-start']}>
        <Image src={imageSrc} alt={title} boxSize="60" objectFit={['cover', 'contain']} borderRadius="md" />
        <Heading
            textAlign={['center', 'left']}
            maxW="200px"
            fontFamily="sans-serif"
            noOfLines={3}
            size="sm"
        >{title}
        </Heading>
        <Text
            textAlign={['center', 'left']}
            noOfLines={2}
        >{description}
        </Text>
        <HStack>
            <Text fontWeight="bold" textTransform="uppercase">Creator:</Text>
            <Text fontFamily="body" textTransform="uppercase">{creator}</Text>
        </HStack>
        <Heading
            textAlign="center"
            size="xs"
            textTransform="uppercase"
        >
            {`Lecture - ${lectureCount}`}
        </Heading>
        <Heading
            textAlign="center"
            size="xs"
            textTransform="uppercase"
        >
            {`Views - ${views}`}
        </Heading>
        <Stack direction={['column', 'row']} alignItems="center">
            <Link to={`/course/${id}`}>
                <Button colorScheme="yellow" size="sm">
                    Watch Now
                </Button>
            </Link>
            <Button
                colorScheme="yellow"
                variant="ghost"
                isLoading={loading}
                onClick={() => addToPlayListHandler(id)}
            >
                Add to Playlist
            </Button>
        </Stack>

    </VStack>
);

const Courses = () => {
    const dispatch = useDispatch();
    const { message, loading, courses } = useSelector((state) => state.course);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const categories = [
        'Web Development',
        'Artificial Intelligence',
        'Data Structure & Algorithms',
        'App Development',
        'Data Science',
        'Game Development',
    ];
    useEffect(() => {
        dispatch(getAllCourses(keyword, category));

        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
    }, [dispatch, category, keyword, message]);
    const addToPlayListHandler = async (id) => {
        await dispatch(addToPlaylist(id));
        dispatch(loadUser());
    };
    return (
        <>
            <PageTitle title="Courses" />
            <Container minH="95vh" maxW="container.lg" paddingY="8">
                <React.Fragment>
                    <Heading m="8">
                        Courses
                    </Heading>
                    <Input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search Courses..." type="text" focusBorderColor="yellow.500" />
                    <HStack
                        overflowX="auto"
                        paddingY="8"
                        css={{
                            '&::-webkit-scrollbar': {
                                display: 'none',
                            },
                        }}
                    >
                        {categories.map((item, index) => (
                            <Button
                                key={index}
                                onClick={() => setCategory(item)}
                                variant={category === item ? 'solid' : 'outline'}
                                _hover={{ bg: 'yellow.100' }}
                                minW="60"
                            >
                                <Text>{item}</Text>
                            </Button>
                        ))}
                    </HStack>
                    <Stack
                        direction={['column', 'row']}
                        flexWrap="wrap"
                        justifyContent={['flex-start', 'space-evenly']}
                        alignItems={['center', 'flex-start']}
                    >
                        {courses?.length > 0
                            ? (
                                courses?.map((course, index) => (
                                    <CourseCard
                                        key={index}
                                        title={course?.title}
                                        description={course?.description}
                                        views={course?.views}
                                        id={course?._id}
                                        creator={course?.createdBy}
                                        imageSrc={course?.poster?.url}
                                        lectureCount={course?.numOfVideos}
                                        addToPlayListHandler={addToPlayListHandler}
                                        loading={loading}
                                    />
                                ))
                            )
                            : (
                                <Heading mt="4">No Courses Found</Heading>
                            )}
                    </Stack>
                </React.Fragment>
            </Container>
        </>

    );
};

export default Courses;