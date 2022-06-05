import { createSlice } from '@reduxjs/toolkit';

import { getUserMessages } from 'redux/actions/messageAction';
import { createMessage } from '../actions/messageAction';

const messageSlice = createSlice({
  name: 'messageSlice',
  initialState: {
    isLoading: false,
    errorCode: null,
    messages: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.messages = payload;
      })
      .addCase(getUserMessages.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(createMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.messages.push({ ...payload });
      })
      .addCase(createMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });
  },
});

export default messageSlice.reducer;
