import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from 'utils/extractError';
import ClientAPI from 'services/ClientAPI';

export const getUserMessages = createAsyncThunk(
  'messages/getUserMessages',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getUserMessages(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const createMessage = createAsyncThunk(
  'messages/createMessage',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.createMessage(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
