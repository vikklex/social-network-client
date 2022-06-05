import { createSlice } from '@reduxjs/toolkit';

import {
  createUserConversation,
  getUserConversations,
} from 'redux/actions/conversationActions';

const conversationSlice = createSlice({
  name: 'conversationSlice',
  initialState: {
    isLoading: false,
    errorCode: null,
    conversations: [],
    currentChat: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserConversations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserConversations.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.conversations = payload;
      })
      .addCase(getUserConversations.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(createUserConversation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserConversation.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.conversations = [{ ...payload }];
        state.currentChat = payload;
      })
      .addCase(createUserConversation.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });
  },
});

export default conversationSlice.reducer;
