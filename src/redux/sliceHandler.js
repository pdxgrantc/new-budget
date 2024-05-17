import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// export reducers
export const userReducer = userSlice.reducer;

// export actions
export const { setUser } = userSlice.actions;
