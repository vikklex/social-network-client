import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from '../../utils/extractError';
import ClientAPI from '../../services/ClientAPI';

export const getFriendsPosts = createAsyncThunk(
  'friendsPosts/getFriendsPosts',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getFriendsPosts(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
