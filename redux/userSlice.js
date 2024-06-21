// userSliceHandler.js
import { createSlice } from '@reduxjs/toolkit';
import { WriteUserDoc } from './utils';

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
        updateUser: async (state, action) => {
            // update local state
            state.user = action.payload;

            // Ensure WriteUserDoc has access to the updated state
            await WriteUserDoc();
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const {
    setUser,
    setLoading,
    setError,
    clearUser,
    updateUser
} = userSlice.actions;

export default userSlice.reducer;
