import { createSlice } from '@reduxjs/toolkit';

import {
  createReaction,
  getAllReactionsForUser,
  getPostReactions,
} from 'redux/actions/reactionAction';

const reactionSlice = createSlice({
  name: 'reaction',
  initialState: {
    isLoading: false,
    isReady: false,

    reactions: [],
    errorCode: null,
  },

  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isReady = false;
      state.errorCode = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createReaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReaction.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;

        state.reactions.push({ ...payload });
      })
      .addCase(createReaction.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(getPostReactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostReactions.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;

        state.reactions.push({ ...payload });
      })
      .addCase(getPostReactions.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(getAllReactionsForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllReactionsForUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;

        state.reactions.push({ ...payload });
      })
      .addCase(getAllReactionsForUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });
  },
});

export const { reset } = reactionSlice.actions;

export default reactionSlice.reducer;
