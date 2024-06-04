import axios from 'axios';
import { server } from '../store';

// Get Dashboard stats
export const getDashboardStats = () => async (dispatch) => {
    try {
        dispatch({ type: 'dashboardStatsRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/admin/stats`, config);
        dispatch({ type: 'dashboardStatsSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'dashboardStatsFailed', payload: error.response.data.message });
    }
};

// Create Admin

export const createAdmin = (form) => async (dispatch) => {
    try {
        dispatch({ type: 'createAdminRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/add-admin`, form, config);
        dispatch({ type: 'createAdminSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'createAdminFailed', payload: error.response.data });
    }
}

// Get All Admins

export const getAllAdmins = (page, limit, searchTerm, sortBy) => async (dispatch) => {
    try {
        dispatch({ type: 'getAllAdminsRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/admins?page=${page}&limit=${limit}&search=${searchTerm}&sort=${sortBy}`, config);
        dispatch({ type: 'getAllAdminsSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getAllAdminsFailed', payload: error.response.data });
    }
}


// Get All Users

export const getAllUsers = (page, limit, searchTerm, sortBy) => async (dispatch) => {
    try {
        dispatch({ type: 'getAllUsersRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/users?page=${page}&limit=${limit}&search=${searchTerm}&sort=${sortBy}`, config);
        dispatch({ type: 'getAllUsersSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getAllUsersFailed', payload: error.response.data });
    }
}
// Change Role Action
export const changeRole = (id, role) => async (dispatch) => {
    try {
        dispatch({ type: 'changeRoleRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.put(`${server}/change-role/${id}`, { role }, config);
        dispatch({ type: 'changeRoleSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'changeRoleFailed', payload: error.response.data });
    }
};

// Delete User Action

export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteUserRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.delete(`${server}/delete-user/${id}`, config);
        dispatch({ type: 'deleteUserSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'deleteUserFailed', payload: error.response.data });
    }
};

// Create Teacher

export const createTeacher = (form) => async (dispatch) => {
    try {
        dispatch({ type: 'createTeacherRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/add-teacher`, form, config);
        dispatch({ type: 'createTeacherSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'createTeacherFailed', payload: error.response.data });
    }
}

// Create Student

export const createStudent = (form) => async (dispatch) => {
    try {
        dispatch({ type: 'createStudentRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/add-user`, form, config);
        dispatch({ type: 'createStudentSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'createStudentFailed', payload: error.response.data });
    }
}

// Get All Students

export const getAllStudents = (page, limit, searchTerm, sortBy) => async (dispatch) => {
    try {
        dispatch({ type: 'getAllStudentsRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/users?page=${page}&limit=${limit}&search=${searchTerm}&sort=${sortBy}`, config);
        dispatch({ type: 'getAllStudentsSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getAllStudentsFailed', payload: error.response.data });
    }
}

// Delete Student Action

export const deleteStudent = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteStudentRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.delete(`${server}/delete-user/${id}`, config);
        dispatch({ type: 'deleteStudentSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'deleteStudentFailed', payload: error.response.data });
    }
};

// Get All Teachers

export const getAllTeachers = (page, limit, searchTerm, sortBy) => async (dispatch) => {
    try {
        dispatch({ type: 'getAllTeachersRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.get(`${server}/teachers?page=${page}&limit=${limit}&search=${searchTerm}&sort=${sortBy}`, config);
        dispatch({ type: 'getAllTeachersSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'getAllTeachersFailed', payload: error.response.data });
    }
}

// Delete Teacher Action

export const deleteTeacher = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'deleteTeacherRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.delete(`${server}/delete-teacher/${id}`, config);
        dispatch({ type: 'deleteTeacherSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'deleteTeacherFailed', payload: error.response.data });
    }
}

// Send Mail To All

export const sendMailToAll = (subject, message) => async (dispatch) => {
    try {
        dispatch({ type: 'sendMailToAllRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/send-mail`, { subject, message }, config);
        dispatch({ type: 'sendMailToAllSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'sendMailToAllFailed', payload: error.response.data });
    }
}

// Send Mail To One

export const sendMailToOne = (id, subject, message) => async (dispatch) => {
    try {
        dispatch({ type: 'sendMailToOneRequest' });
        const config = {
            withCredentials: true,
        };
        const { data } = await axios.post(`${server}/send-mail/${id}`, { subject, message }, config);
        dispatch({ type: 'sendMailToOneSuccess', payload: data });
    } catch (error) {
        dispatch({ type: 'sendMailToOneFailed', payload: error.response.data });
    }
}