import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    message: null,
    loading: false,
    isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
    loginRequest: (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.user = null;
        state.message = null;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    loginFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
    },
    registerRequest: (state) => {
        state.loading = true;
    },
    registerSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload.user;
        state.message = action.payload.message;
    },
    registerFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.message = action.payload.message;
    },
    logout: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload.message;
    },
    verifyEmailRequest: (state) => {
        state.loading = true;
    },
    verifyEmailSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isAuthenticated = true;
        state.user = action.payload.user;
    },
    verifyEmailFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.isAuthenticated = false;
        state.user = null;
    },
    resendEmailRequest: (state) => {
        state.loading = true;
    },
    resendEmailSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    resendEmailFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    logedInUserRequest: (state) => {
        state.loading = true;
    },
    logedInUserSuccess: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
    },
    logedInUserFail: (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.message = action.payload.message;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    forgetPasswordRequest: (state) => {
        state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    forgetPasswordFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    resetPasswordRequest: (state) => {
        state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    resetPasswordFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    clearExams: (state) => {
        state.message = null;
    },
});

export default userReducer;