import { configureStore } from '@reduxjs/toolkit';
import userReducer from './sliceHandler'; // replace with your actual userSlice file path


const store = configureStore({

    reducer: {
        user: userReducer
    }
});

export default store;