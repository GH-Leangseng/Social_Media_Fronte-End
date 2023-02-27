import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import postReducer from "./slice/postSlice";
export default combineReducers({
        auth : authReducer,
        post : postReducer
})