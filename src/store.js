import {configureStore} from '@reduxjs/toolkit';
import { userReducers } from './slices/userSlice';
import logger from "redux-logger"

export const store = configureStore({
    reducer : {
        user : userReducers
    },
   middleware : (getDefaultMiddleWare) => ([...getDefaultMiddleWare(), logger])

})