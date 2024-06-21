// userSliceHandler.js
import { createSlice } from '@reduxjs/toolkit';
import { WriteUserDoc } from './utils';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const incomeSlice = createSlice({
    name: 'income',
    initialState,
    reducers: {

    },
});

export const { } = incomeSlice.actions;

export default incomeSlice.reducer;
