import {configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice'
import trainerReducer from './trainerSlice'
import adminSlice from './adminSlice';
  
  const persistConfig = { key: 'root', storage, version: 1 };
  
  const reducer = combineReducers({
    userReducer,
    trainerReducer,
    adminSlice
  })

const persistedReducer = persistReducer(persistConfig,reducer)

  export const store =  configureStore({
    reducer: persistedReducer
  })