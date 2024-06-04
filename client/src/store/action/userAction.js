import axios from 'axios';
import { server } from '../store';

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: 'loginRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/login`, { email, password }, config);
        dispatch({ type: 'loginSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'loginFail', payload: error.response.data });
    }
}

export const register = (form) => async (dispatch) => {
    dispatch({ type: 'registerRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/register`, form, config);
        dispatch({ type: 'registerSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'registerFail', payload: error.response.data });
    }
}

export const logout = () => async (dispatch) => {
    try {
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/logout`, config);
        dispatch({ type: 'logout', payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const verifyEmail = (token) => async (dispatch) => {
    dispatch({ type: 'verifyEmailRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/verify-email/${token}`, config);
        dispatch({ type: 'verifyEmailSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'verifyEmailFail', payload: error.response.data });
    }
}

export const resendVerificationEmail = (email) => async (dispatch) => {
    dispatch({ type: 'resendEmailRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/resend-verification-email`, { email }, config);
        dispatch({ type: 'resendEmailSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'resendEmailFail', payload: error.response.data });
    }
}

export const loadUser = () => async (dispatch) => {
    dispatch({ type: 'logedInUserRequest' });
    try {
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/me`, config);
        dispatch({ type: 'logedInUserSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'logedInUserFail', payload: error.response.data });
    }
}

export const forgetPassword = (email) => async (dispatch) => {
    dispatch({ type: 'forgetPasswordRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/forget-password`, { email }, config);
        dispatch({ type: 'forgetPasswordSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'forgetPasswordFail', payload: error.response.data });
    }
}

export const resetPassword = (password, confirmPassword, token) => async (dispatch) => {
    dispatch({ type: 'resetPasswordRequest' });
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/reset-password/${token}`, { password, confirmPassword }, config);
        dispatch({ type: 'resetPasswordSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'resetPasswordFail', payload: error.response.data });
    }
}