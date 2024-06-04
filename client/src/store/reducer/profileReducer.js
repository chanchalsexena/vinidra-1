import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    message: null,
    loading: false,
    isAuthenticated: false,
};
export const profileReducer = createReducer(initialState, {
    updateProfileRequest: (state) => {
        state.loading = true;
    },
    updateProfileSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload.message;
    },
    updateProfileFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    updateAvatarRequest: (state) => {
        state.loading = true;
    },
    updateAvatarSuccess: (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.message = action.payload;
    },
    updateAvatarFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    changePasswordRequest: (state) => {
        state.loading = true;
    },
    changePasswordSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    changePasswordFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    clearMessage: (state) => {
        state.message = null;
    },
});


export default profileReducer;