import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from 'utils/extractError';
import ClientAPI from 'services/ClientAPI';

export const getUserConversations = createAsyncThunk(
  'conversations/getUserConversations',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getUserConversations(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const createUserConversation = createAsyncThunk(
  'conversations/createUserConversation',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.createUserConversation(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
