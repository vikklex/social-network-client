import { createSlice } from '@reduxjs/toolkit';

import { getFriendsPosts } from 'redux/actions/friendsPostAction';

const friendsPostSlice = createSlice({
  name: 'friendPost',
  initialState: {
    isLoading: false,
    isReady: false,
    errorCode: null,
    user: null,

    friendsPosts: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getFriendsPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriendsPosts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = null;
        state.friendsPosts = payload;
      })
      .addCase(getFriendsPosts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });
  },
});

export const { reset } = friendsPostSlice.actions;

export default friendsPostSlice.reducer;
