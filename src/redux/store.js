// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './sliceHandler';

export default configureStore({
  reducer: {
    user: userSlice,
  },
});
// src/sliceHandler.js