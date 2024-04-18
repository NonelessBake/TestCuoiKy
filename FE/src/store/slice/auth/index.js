import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  accessToken: null,
  userInfo: {},
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload.userInfo;
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = {};
      state.accessToken = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
