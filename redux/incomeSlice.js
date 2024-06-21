// userSliceHandler.js
import { createSlice } from '@reduxjs/toolkit';
import { WriteUserDoc } from './utils';

const initialState = {
    income: null,
    loading: false,
    error: null,
};

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {
        setIncome: (state, action) => {
            state.income = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setIncome,
    setLoading,
    setError
} = incomeSlice.actions;

export default incomeSlice.reducer;
