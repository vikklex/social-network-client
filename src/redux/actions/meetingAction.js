import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from 'utils/extractError';
import ClientAPI from 'services/ClientAPI';

export const createMeeting = createAsyncThunk(
  'meeting/createMeeting',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.createMeeting(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getMeetings = createAsyncThunk(
  'meeting/getMeetings',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getMeetings(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const updateMeeting = createAsyncThunk(
  'meeting/updateMeeting',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.updateMeeting(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const deleteMeeting = createAsyncThunk(
  'meeting/deleteMeeting',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.deleteMeeting(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
