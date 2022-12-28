import { createSlice } from "@reduxjs/toolkit";

import { login, register } from "../actions/authAction";

const initialState = {
  isLoading: false,
  token: null,
  isError: null,
  isSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isLoading = false;
      state.token = null;
      state.isError = null;
      state.isSuccess = false;
    },
  },
  extraReducers: (build) => {
    build.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(login.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    });
    build.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isError = null;
      state.isLoading = false;
      state.isSuccess = true;
    });
    build.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    build.addCase(register.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    });
    build.addCase(register.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isError = null;
      state.isLoading = false;
      state.isSuccess = true;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
