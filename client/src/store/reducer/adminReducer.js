import { createReducer } from "@reduxjs/toolkit";


const adminReducer = createReducer({}, {
    dashboardStatsRequest: (state) => { state.loading = true; },
    dashboardStatsSuccess: (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.usersCount = action.payload.usersCount;
        state.subscriptionCount = action.payload.subscriptionCount;
        state.viewsCount = action.payload.viewsCount;
        state.usersPercentage = action.payload.usersPercentage;
        state.viewsPercentage = action.payload.viewsPercentage;
        state.subscriptionPercentage = action.payload.subscriptionPercentage;
        state.usersProfit = action.payload.usersProfit;
        state.viewsProfit = action.payload.viewsProfit;
        state.subscriptionProfit = action.payload.subscriptionProfit;
    },
    dashboardStatsFailed: (state, action) => { state.loading = false; state.error = action.payload; },
    clearErrors: (state) => { state.error = null; },
    clearMessage: (state) => { state.message = null; },
    createAdminRequest: (state) => { state.loading = true; },
    createAdminSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    createAdminFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    getAllAdminsRequest: (state) => { state.loading = true; },
    getAllAdminsSuccess: (state, action) => {
        state.loading = false; state.admins = action.payload.admins;
        state.totalAdmins = action.payload.totalAdmins;
    },
    getAllAdminsFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    getAllUsersRequest: (state) => { state.loading = true; },
    getAllUsersSuccess: (state, action) => {
        state.loading = false; state.users = action.payload.users;
        state.totalUsers = action.payload.totalUsers;
    },
    getAllUsersFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    changeRoleRequest: (state) => { state.loading = true; },
    changeRoleSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    changeRoleFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    deleteUserRequest: (state) => { state.loading = true; },
    deleteUserSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    deleteUserFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    createTeacherRequest: (state) => { state.loading = true; },
    createTeacherSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    createTeacherFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    createStudentRequest: (state) => { state.loading = true; },
    createStudentSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    createStudentFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    getAllStudentsRequest: (state) => { state.loading = true; },
    getAllStudentsSuccess: (state, action) => { state.loading = false; state.students = action.payload.students; },
    getAllStudentsFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    deleteStudentRequest: (state) => { state.loading = true; },
    deleteStudentSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    deleteStudentFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    getAllTeachersRequest: (state) => { state.loading = true; },
    getAllTeachersSuccess: (state, action) => {
        state.loading = false; state.teachers = action.payload.teachers;
        state.totalTeachers = action.payload.totalTeachers;
    },
    getAllTeachersFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    deleteTeacherRequest: (state) => { state.loading = true; },
    deleteTeacherSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    deleteTeacherFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    sendMailToAllRequest: (state) => { state.loading = true; },
    sendMailToAllSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    sendMailToAllFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
    sendMailToOneRequest: (state) => { state.loading = true; },
    sendMailToOneSuccess: (state, action) => { state.loading = false; state.message = action.payload.message; },
    sendMailToOneFailed: (state, action) => { state.loading = false; state.error = action.payload.message; },
});

export default adminReducer;

