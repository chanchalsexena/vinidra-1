import axios from 'axios';
import { server } from '../store';

// Get All Courses

export const getAllCourses = (keyword = '', category = "") => async (dispatch) => {
    dispatch({ type: 'getAllCoursesRequest' });
    try {
        const config = { withCredentials: true };
        const { data } = await axios.get(`${server}/get-course?keyword=${keyword}&category=${category}`, config);
        dispatch({ type: 'getAllCoursesSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getAllCoursesFail', payload: error.response.data });
    }
}

// Add to Playlist

export const addToPlaylist = (id) => async (dispatch) => {
    dispatch({ type: 'addToPlaylistRequest' });
    try {
        const config = { withCredentials: true };
        const { data } = await axios.put(`${server}/course/${id}/add-to-playlist`, {}, config);
        dispatch({ type: 'addToPlaylistSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'addToPlaylistFail', payload: error.response.data });
    }
}

// Remove from Playlist

export const removeFromPlaylist = (id) => async (dispatch) => {
    dispatch({ type: 'removeFromPlaylistRequest' });
    try {
        const { data } = await axios.put(`${server}/course/${id}/remove-from-playlist`, {}, { withCredentials: true });
        dispatch({ type: 'removeFromPlaylistSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'removeFromPlaylistFail', payload: error.response.data });
    }
}

// Get Lectures Related to Course

export const getLectures = (id) => async (dispatch) => {
    dispatch({ type: 'getLecturesRequest' });
    try {
        const config = { withCredentials: true };
        const { data } = await axios.get(`${server}/get-course/${id}`, config);
        dispatch({ type: 'getLecturesSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getLecturesFail', payload: error.response.data });
    }
}