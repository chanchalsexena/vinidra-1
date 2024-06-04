import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/userReducer';
import profileReducer from './reducer/profileReducer';
import contactReducer from './reducer/contactReducer';
import subscriptionReducer from './reducer/subscriptionReducer';
import courseReducer from './reducer/courseReducer';
import examReducer from './reducer/examReducer';
import adminReducer from './reducer/adminReducer';
import homeReducer from './reducer/homeReducer';
import faqReducer from './reducer/faqReducer';
const store = configureStore({
    reducer: {
        user: userReducer,
        profile: profileReducer,
        contact: contactReducer,
        subscription: subscriptionReducer,
        course: courseReducer,
        exam: examReducer,
        admin: adminReducer,
        home: homeReducer,
        faq: faqReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    // devTools: false,
});

export default store;

export const server = 'http://localhost:8000/api/v1';