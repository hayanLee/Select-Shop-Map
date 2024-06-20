import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import shopReducer from './slices/shopSlice';

const rootReducer = combineReducers({
  shop: shopReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
