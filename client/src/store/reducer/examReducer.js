import { createReducer } from "@reduxjs/toolkit";
export const examReducer = createReducer(
  {},
  {
    getAllExamsRequest: (state) => {
      state.loading = true;
    },
    getAllExamsSuccess: (state, action) => {
      state.loading = false;
      state.exams = action.payload.exams;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.totalCount = action.payload.totalCount;
    },
    getAllExamsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    getSingleExamRequest: (state) => {
      state.loading = true;
    },
    getSingleExamSuccess: (state, action) => {
      state.loading = false;
      state.exam = action.payload.exam;
    },
    getSingleExamFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    updateExamRequest: (state) => {
      state.loading = true;
    },
    updateExamSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateExamFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    downloadReportRequest: (state) => {
      state.loading = true;
    },
    downloadReportSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    downloadReportFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    deleteExamRequest: (state) => {
      state.loading = true;
    },
    deleteExamSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteExamFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    createExamRequest: (state) => {
      state.loading = true;
    },
    createExamSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.exam = action.payload.exam;
    },
    createExamFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    startExamAttemptRequest: (state) => {
      state.loading = true;
    },
    startExamAttemptSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    startExamAttemptFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    submitExamAttemptRequest: (state) => {
      state.loading = true;
    },
    submitExamAttemptSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.data = action.payload.data;
    },
    submitExamAttemptFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    getResultsRequest: (state) => {
      state.loading = true;
    },
    getResultsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    },
    getResultsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    clearError: (state) => {
      state.error = null;
    },
    getTop10ScoresRequest: (state) => {
      state.loading = true;
    },
    getTop10ScoresSuccess: (state, action) => {
      state.loading = false;
      state.topScores = action.payload.topScores;
    },
    getTop10ScoresFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    updateQuestionRequest: (state) => {
      state.loading = true;
    },
    updateQuestionSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateQuestionFail: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  }
);

export default examReducer;
