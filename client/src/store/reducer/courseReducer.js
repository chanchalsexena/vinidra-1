import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    message: '',
    courses: [],
    lectures: [],
}

export const courseReducer = createReducer(initialState, {
    getAllCoursesRequest: (state) => {
        state.loading = true;
    },
    getAllCoursesSuccess: (state, action) => {
        state.loading = false;
        state.courses = action.payload.course;
    },
    getAllCoursesFail: (state, action) => {
        state.loading = false;
        state.message = action.payload;
    },
    addToPlaylistRequest: (state) => {
        state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    addToPlaylistFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    removeFromPlaylistRequest: (state) => {
        state.loading = true;
    },
    removeFromPlaylistSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    removeFromPlaylistFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    getLecturesRequest: (state) => {
        state.loading = true;
    },
    getLecturesSuccess: (state, action) => {
        state.loading = false;
        state.lectures = action.payload.lectures;
    },
    getLecturesFail: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    clearMessage: (state) => {
        state.message = '';
    },

});


export default courseReducer;