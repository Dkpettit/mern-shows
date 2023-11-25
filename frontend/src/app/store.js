import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import showReducer from '../features/shows/showSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shows: showReducer
  },
});
