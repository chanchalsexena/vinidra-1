import { server } from "../store";
import axios from "axios";

export const getFaqs = () => async (dispatch) => {
    try {
        dispatch({ type: 'getFaqRequest' });
        const { data } = await axios.get(`${server}/faq`);
        dispatch({ type: 'getFaqSuccess', payload: data });
    }catch(error){
        dispatch({ type: 'getFaqFailure', payload: error.response.data });
    }
}

export const getSingleFaq = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'getSingleFaqRequest' });
        const { data } = await axios.get(`${server}/faq/${id}`);
        dispatch({ type: 'getSingleFaqSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getSingleFaqFailure', payload: error.response.data });
    }
}

export const createFaq = (faq) => async (dispatch) => {
    try {
        dispatch({ type: 'createFaqRequest' });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/faq`, faq, config);
        dispatch({ type: 'createFaqSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'createFaqFailure', payload: error.response.data });
    }
}

export const updateFaq = (id, faq) => async (dispatch) => {
    try {
        dispatch({ type: 'updateFaqRequest' });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/faq/${id}`, faq, config);
        dispatch({ type: 'updateFaqSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'updateFaqFailure', payload: error.response.data });
    }
}
