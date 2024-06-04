import { createReducer } from '@reduxjs/toolkit';

export const subscriptionReducer = createReducer({}, {
    buySubscriptionRequest: (state) => {
        state.loading = true;
    },
    buySubscriptionSuccess: (state, action) => {
        state.loading = false;
        state.subscriptionId = action.payload;
    },
    buySubscriptionFailed: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    cancelSubscriptionRequest: (state) => {
        state.loading = true;
    },
    cancelSubscriptionSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    cancelSubscriptionFailed: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
    },
    clearMessage: (state) => { state.message = ''; },
});

export default subscriptionReducer;