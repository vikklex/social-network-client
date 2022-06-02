import { createSlice } from '@reduxjs/toolkit';
import { storage } from 'storage';

import { login, register, getProfile } from 'redux/actions/authActions';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isReady: false,
    profile: null,
    token: storage.accessToken.Get(),
    isLoggedIn: storage.accessToken.Get() !== null,
    errorCode: null,
  },

  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.isReady = false;
      state.isLoggedIn = false;
      state.profile = null;
      state.errorCode = null;
      storage.accessToken.Remove();
      window.location.href = '/login';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;

        state.token = payload.token;
        storage.accessToken.Set(payload.token);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.token = payload.token;
        state.isLoggedIn = true;
        storage.accessToken.Set(payload.token);
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, { payload }) => {
        state.profile = payload;
        state.isLoading = false;
        state.isReady = true;
        state.errorCode = null;
      })
      .addCase(getProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.profile = null;
        state.errorCode = payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;

export default authSlice.reducer;
