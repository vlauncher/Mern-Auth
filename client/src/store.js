import { configureStore } from '@reduxjs/toolkit';
import authReducers from './features/slices/authSlice';

 const store = configureStore({
    reducer : {
        auth:authReducers
    }
})

export default store;