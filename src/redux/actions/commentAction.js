import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from '../../utils/extractError';
import ClientAPI from '../../services/ClientAPI';

export const createComment = createAsyncThunk(
  'comment/createComment',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.createComment(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getComments = createAsyncThunk(
  'comment/getComments',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getComments(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.updateComment(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.deleteComment(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
