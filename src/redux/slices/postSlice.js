import { createSlice } from '@reduxjs/toolkit';

import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
  updatePostImage,
} from 'redux/actions/postActions';

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item.id !== id);
  return newData;
};

const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLoading: false,
    errorCode: null,
    post: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.post.push({ ...payload });
      })
      .addCase(createPost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.post = payload;
      })
      .addCase(getPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
      })
      .addCase(updatePost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.post = [{ ...payload }];
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(updatePostImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePostImage.fulfilled, (state) => {
        state.isLoading = false;
        state.errorCode = null;
      })
      .addCase(updatePostImage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });
  },
});

export default postSlice.reducer;
