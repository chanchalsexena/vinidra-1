import axios from 'axios';
import { server } from '../store';

export const getExamResult = (examId) => async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/exam/${examId}/result`);
      dispatch({
        type: 'GET_EXAM_RESULT_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_EXAM_RESULT_FAIL',
        payload: error.response.data.message,
      });
    }
};
  
export const getAllExams = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: 'getAllExamsRequest' });
        const { data } = await axios.get(`${server}/exam?keyword=${keyword}`);
        dispatch({ type: 'getAllExamsSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getAllExamsFail', payload: error.response.data });
    }
}

// Get single exam details

export const getSingleExam = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'getSingleExamRequest' });
        const { data } = await axios.get(`${server}/exam/${id}`);
        dispatch({ type: 'getSingleExamSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getSingleExamFail', payload: error.response.data });
    }
}

//Start exam attempt

export const startExamAttempt = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'startExamAttemptRequest' });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/exam/attempt/${id}`, {}, config);
        dispatch({ type: 'startExamAttemptSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'startExamAttemptFail', payload: error.response.data });
    }
}
// Submit exam attempt

export const submitExamAttempt = (id, answers) => async (dispatch) => {
    try {
        dispatch({ type: 'submitExamAttemptRequest' });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/exam/attempt/${id}`, { answers }, config)
        dispatch({ type: 'submitExamAttemptSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'submitExamAttemptFail', payload: error.response.data });
    }
};

// Get Result

export const getResult = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'getResultsRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/exam/result/${id}`, config);
        dispatch({ type: 'getResultsSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getResultsFail', payload: error.response.data });
    }
}

// Get Top 10 Scores

export const getTop10Scores = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'getTop10ScoresRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/exam/top10/${id}`, config);
        dispatch({ type: 'getTop10ScoresSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getTop10ScoresFail', payload: error.response.data });
    }
}

// Create Exam

export const createExam = (exam) => async (dispatch) => {
    console.log("createExam action called", exam);
    try {
        dispatch({ type: 'createExamRequest' });
        const config = {
            headers: {
                'Content-Type':"application/json",
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/exam`, exam, config);
        dispatch({ type: 'createExamSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'createExamFail', payload: error.response.data });
    }
}

// Update Exam

export const updateExam = (id, exam) => async (dispatch) => {
    try {
        dispatch({ type: 'updateExamRequest' });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/exam/${id}`, exam, config);
        dispatch({ type: 'updateExamSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'updateExamFail', payload: error.response.data });
    }
}

// Delete Exam

export const deleteExam = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteExamRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.delete(`${server}/exam/${id}`, config);
        dispatch({ type: 'deleteExamSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'deleteExamFail', payload: error.response.data });
    }
}


// Download Report

export const downloadReport = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'downloadReportRequest' });
        const config = {
            withCredentials: true,
            responseType: 'blob',
        };
        const response = await axios.get(`${server}/exam/report/${id}`, config);
        dispatch({ type: 'downloadReportSuccess', payload: response.data }); 
        return response; 
    } catch (error) {
        dispatch({ type: 'downloadReportFail', payload: error.response.data });
        throw error; 
    }
};

// Update Question

export const updateQuestion = (id, question) => async (dispatch) => {
    try {
        dispatch({ type: 'updateQuestionRequest' });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/exam/question/${id}`, question, config);
        dispatch({ type: 'updateQuestionSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'updateQuestionFail', payload: error.response.data });
    }
}