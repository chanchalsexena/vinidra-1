import axios from 'axios';
import { server } from '../store';
export const getHomeData = ()=> async (dispatch) => {
    try {
        dispatch({ type: 'getHeroRequest' }); 
        const { data } = await axios.get(`${server}/home`);
        dispatch({ type: 'getHeroSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getHeroFail', payload: error.response.data });
    }
}


export const createHomeData = (form) => async (dispatch) => {
    dispatch({ type: 'createHeroRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/create-home`, form, config);
        dispatch({ type: 'createHeroSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'createHeroFail', payload: error.response.data });
    }
}

export const updateHomeData = (id, form) => async (dispatch) => {
    dispatch({ type: 'updateHeroRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/update-home/${id}`, form, config);
        dispatch({ type: 'updateHeroSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'updateHeroFail', payload: error.response.data });
    }
}
