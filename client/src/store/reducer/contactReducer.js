import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    message: null,
    loading: false
};

export const contactReducer = createReducer(initialState, {
    contactRequest: (state) => {
        state.loading = true;
        state.message = null;
    },
    contactSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    contactFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    requestCourseRequest: (state) => {
        state.loading = true;
        state.message = null;
    },
    requestCourseSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    requestCourseFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    }
});


export default contactReducer;

