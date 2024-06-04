import { createReducer } from '@reduxjs/toolkit';

const initialState = {
    data : [],
    loading: false,
    error: "",
    message: ""
};

export const faqReducer = createReducer(initialState, {
    getFaqRequest: (state) => {
        state.loading = true;
    },
    getFaqSuccess: (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
    },
    getFaqFailure: (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
    },
    getSingleFaqRequest: (state) => {
        state.loading = true;
    },
    getSingleFaqSuccess: (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
    },
    getSingleFaqFailure: (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
    },
    createFaqRequest: (state) => {
        state.loading = true;
    },
    createFaqSuccess: (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
    },
    createFaqFailure: (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
    },
    updateFaqRequest: (state) => {
        state.loading = true;
    },
    updateFaqSuccess: (state, action) => {
        state.message = action.payload.message;
        state.loading = false;
    },
    updateFaqFailure: (state, action) => {
        state.error = action.payload.message;
        state.loading = false;
    },
    cleraMessage: (state) => {
        state.message = "";
    },
    clearError: (state) => {
        state.error = "";
    }
});

export default faqReducer;

