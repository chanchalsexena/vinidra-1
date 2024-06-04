import axios from 'axios';
import { server } from '../store';
export const contactUs = ({ name, email, message }) => async (dispatch) => {
    try {
        dispatch({ type: 'contactRequest' });
        const { data } = await axios.post(`${server}/contact`, { name, email, message });
        dispatch({ type: 'contactSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'contactFail', payload: error.response.data.message });
    }
};

export const requestCourse = ({ name, email, course }) => async (dispatch) => {
    try {
        dispatch({ type: 'requestCourseRequest' });
        const { data } = await axios.post(`${server}/requestCourse`, { name, email, course });
        dispatch({ type: 'requestCourseSuccess', payload: data });
    }
    catch (error) {
        dispatch({ type: 'requestCourseFail', payload: error.response.data.message });
    }
}