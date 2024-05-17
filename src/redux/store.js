// create a store with the slice as .userSlice

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
})
