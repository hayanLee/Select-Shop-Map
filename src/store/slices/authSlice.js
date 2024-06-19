import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      id: 'user-id',
      nickname: '개돌이'
    },
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
