import { createReducer } from "@reduxjs/toolkit";
const initialState = {
    home: {},
    loading: false,
    error: null,
    message: null,
};

export const homeReducer = createReducer(initialState, {
    getHeroRequest: (state) => {
        state.loading = true;
    },
    getHeroSuccess: (state, action) => {
        state.loading = false;
        state.home = action.payload.home;
    },
    getHeroFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
    },
    createHeroRequest: (state) => {
        state.loading = true;
    },
    createHeroSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    createHeroFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
    },
    updateHeroRequest: (state) => {
        state.loading = true;
    },
    updateHeroSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    updateHeroFail: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
    },
    clearMessage: (state) => {
        state.message = null;
    },
    clearError: (state) => {
        state.error = null;
    },
});


export default homeReducer;
    