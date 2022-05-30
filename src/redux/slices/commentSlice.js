import { createSlice } from '@reduxjs/toolkit';

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from 'redux/actions/commentAction';

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item.id !== id);

  return newData;
};

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    isLoading: false,
    isReady: false,
    comment: [],
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
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;

        state.comment.push(payload);
      })
      .addCase(createComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;

        state.comment = payload;
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
      })
      .addCase(updateComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;

        state.comment = [{ ...payload }];
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });
  },
});

export const { reset } = commentSlice.actions;

export default commentSlice.reducer;
