import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from 'utils/extractError';
import ClientAPI from 'services/ClientAPI';

export const createPost = createAsyncThunk(
  'post/createPost',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.createPost(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getPosts = createAsyncThunk(
  'post/getPosts',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getUserPosts(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const updatePost = createAsyncThunk(
  'post/updatePost',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.updatePost(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const updatePostImage = createAsyncThunk(
  'post/updatePostImage',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.updatePostImage(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const deletePost = createAsyncThunk(
  'post/deletePost',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.deletePost(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
