// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import incomeReducer from './incomeSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        income: incomeReducer
    },
});

export default store;
