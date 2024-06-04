import { useState, useEffect } from 'react';
import { Flex, Box, Button, FormControl, FormLabel, Input, Textarea, Image, Spinner } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { getHomeData, createHomeData, updateHomeData } from '../../../store/action/homeAction';
import toast from 'react-hot-toast';
import Layout from '../DashBoard/Layout';
import PageTitle from '../../../PageTitle';
const Home = () => {
    const dispatch = useDispatch();
    const { home, loading, message, error } = useSelector(state => state.home);
    const [formData, setFormData] = useState({
        _id: home[0]?._id || '',
        title: home[0]?.title || '',
        description: home[0]?.description || '',
        image: null,
        imageUrl: null,
    });

    useEffect(() => {
        dispatch(getHomeData());
    }, [dispatch]);

    useEffect(() => {
        if (message) {
            toast.success(message);
            dispatch({ type: 'clearMessage' });
        }
        if (error) {
            toast.error(error);
            dispatch({ type: 'clearError' });
        }
    }, [message, error, dispatch]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setFormData({
            ...formData,
            image: selectedImage,
            imageUrl: URL.createObjectURL(selectedImage),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('title', formData.title);
        form.append('description', formData.description);
        form.append('file', formData.image);

        if (formData._id) {
            dispatch(updateHomeData(formData._id, form)).then(() => {
                dispatch(getHomeData());
            });
        } else {
            dispatch(createHomeData(form)).then(() => {
                dispatch(getHomeData());
            });
            dispatch(getHomeData());
        }
    };

    return (
        <>
            <PageTitle title="Edit Home" />
            <Layout>
                <Flex align="center" justify="center" direction="column" height={{ base: '100vh', md: '80vh' }} overflow="hidden">
                    <Box fontSize="xl" fontWeight="bold">Home</Box>
                    <Box mt={8} p={8} borderWidth={1} borderRadius={8}>
                        <form onSubmit={handleSubmit}>
                            <FormControl isRequired>
                                <FormLabel>Title</FormLabel>
                                <Input type="text" name="title" value={formData.title} onChange={handleInputChange} />
                            </FormControl>

                            <FormControl mt={4} isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea type="text" name="description" value={formData.description} onChange={handleInputChange} />
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Image</FormLabel>
                                <Input type="file" name="image" onChange={handleImageChange} />
                                {formData.imageUrl && (
                                    <Image src={formData.imageUrl} alt="Preview" mt={2} boxSize="100px" objectFit="cover" />
                                )}
                            </FormControl>

                            <Button mt={4} colorScheme="blue" type="submit" disabled={loading}>
                                {loading ? <Spinner /> : formData._id ? 'Update' : 'Create'}
                            </Button>
                        </form>
                    </Box>
                </Flex>
            </Layout>
        </>
    );
};

export default Home;
