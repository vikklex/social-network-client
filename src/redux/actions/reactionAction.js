import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from 'utils/extractError';
import ClientAPI from 'services/ClientAPI';

export const createReaction = createAsyncThunk(
  'reaction/createReaction',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.createReaction(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getPostReactions = createAsyncThunk(
  'reaction/getPostReaction',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getAllPostReactions(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getAllReactionsForUser = createAsyncThunk(
  'reaction/getAllReaactionsForUser',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getAllReactionsForUser(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getReactionsFromDate = createAsyncThunk(
  'reaction/getReactionsFromDate',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getReactionsFromDate(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
