import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from 'utils/extractError';
import ClientAPI from 'services/ClientAPI';

export const login = createAsyncThunk(
  'auth/login',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.login(data);

      return { token: res.data.msg.access_token };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.register(data);

      return { token: res.data.access_token, user: res.data.user };
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getProfile = createAsyncThunk(
  'auth/getProfile',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getUser(data);

      return res.data.user;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
