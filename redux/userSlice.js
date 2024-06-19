// userSliceHandler.js
import { createSlice } from '@reduxjs/toolkit';
import { get } from 'firebase/database';

const initialState = {
    user: null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
        getUser: () => {
            console.log(state.user)
            return state;
        }
    },
});

export const { setUser, setLoading, setError, clearUser, getUser } = userSlice.actions;

export default userSlice.reducer;
