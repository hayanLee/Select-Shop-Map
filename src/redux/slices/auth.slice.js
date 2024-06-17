import { createSlice } from '@reduxjs/toolkit';

const initialState = { nickname: 'test' };
const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUserAuth: (state, action) => {},
    clearUserAuth: (state) => {}
  }
});

export const { setUserAuth, clearUserAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
