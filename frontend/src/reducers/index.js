import authReducer from './auth.js';
import { combineReducers } from 'redux';
import postReducer from "./posts.js"
export const reducers = combineReducers({ authReducer, postReducer});