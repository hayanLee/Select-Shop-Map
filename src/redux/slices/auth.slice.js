import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: '', nickname: '' };
const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setUserAuth: (state, action) => {
      const { id, nickname } = action.payload;
      console.log('>>>>>>>>>>', id, nickname);
      state.id = id;
      state.nickname = nickname;
    },
    clearUserAuth: () => initialState
  }
});

export const { setUserAuth, clearUserAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
