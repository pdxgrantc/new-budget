import { configureStore } from '@reduxjs/toolkit';


// reducers
import { userReducer } from './sliceHandler';


export default configureStore({
    reducer: {
        user: userReducer,
    },
});