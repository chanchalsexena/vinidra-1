/* eslint-disable react/prop-types */
import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { getLectures } from '../../store/action/courseAction';
import { Loader } from "../../index.js"
import PageTitle from '../../PageTitle.jsx';
const CoursePage = ({ user }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message, lectures, loading } = useSelector((state) => state.course);
    const [lectureNumber, setLectureNumber] = useState(0);
    useEffect(() => {
        if (message) { toast.success(message); dispatch({ type: 'clearMessage' }); }
        dispatch(getLectures(id));
    }, [dispatch, id, message]);
    if (user?.role !== 'admin' && (user?.subscription === undefined || user.subscription.status !== 'active')) {
        return navigate('/subscribe');
    }
    return (
        <>
            <PageTitle title="Course" />
            <div>
                {loading ? <Loader /> : (
                    <Grid templateColumns={['1fr', '3fr 1fr']} gap={4} minH="88vh" mt="3">
                        {lectures && lectures.length > 0 ? (
                            <React.Fragment>
                                <Box borderRadius={4} pl={5}>
                                    <video
                                        width="100%"
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="video"
                                        controls
                                        controlsList="nodownload noremoteplayback noloop"
                                        disablePictureInPicture
                                        disableRemotePlayback
                                        src={lectures[lectureNumber]?.video?.url}
                                    />
                                    <Heading m={4}>
                                        {`#${lectureNumber + 1} ${lectures[lectureNumber]?.title}`}
                                    </Heading>
                                    <Heading m={4}>
                                        Description
                                    </Heading>
                                    <Text m={4}>
                                        {lectures[lectureNumber]?.description}
                                    </Text>
                                </Box>
                                <VStack>
                                    {lectures?.map((lecture, index) => (
                                        <button
                                            type="button"
                                            key={lecture._id}
                                            onClick={() => setLectureNumber(index)}
                                            style={{
                                                width: '100%',
                                                padding: '1rem',
                                                textAlign: 'center',
                                                margin: 0,
                                                borderBottom: '1px solid rgba(0,0,0,0.2)',
                                            }}
                                        >
                                            <Text noOfLines={1}>
                                                {`#${index + 1} ${lecture?.title}`}
                                            </Text>
                                        </button>
                                    ))}
                                </VStack>
                            </React.Fragment>
                        ) : (
                            <Heading ml={20}>No Lectures Found</Heading>
                        )}
                    </Grid>
                )}
            </div>
        </>
    );
};

export default CoursePage;