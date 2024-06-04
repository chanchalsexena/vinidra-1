import axios from 'axios';
import { server } from '../store';

// Update user profile (username,email,fullname)
// Update user Avatar
// Change Password

export const updateProfile = (form) => async (dispatch) => {
    dispatch({ type: 'updateProfileRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/update-profile`, form, config);
        dispatch({ type: 'updateProfileSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'updateProfileFail', payload: error.response.data });
    }
}

export const updateAvatar = (formData) => async (dispatch) => {
    dispatch({ type: 'updateAvatarRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/update-avatar`, formData, config);
        dispatch({ type: 'updateAvatarSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'updateAvatarFail', payload: error.response.data });
    }
}

export const changePassword = (oldPassword, newPassword) => async (dispatch) => {
    dispatch({ type: 'changePasswordRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/change-password`, { oldPassword, newPassword }, config);
        dispatch({ type: 'changePasswordSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'changePasswordFail', payload: error.response.data });
    }
}