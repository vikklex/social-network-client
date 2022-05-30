import { createSlice } from '@reduxjs/toolkit';

import {
  getUserProfile,
  searchUser,
  updateUser,
  updateAvatar,
  deleteAvatar,
  updateAlbum,
  deleteImageFromAlbum,
  addFriend,
  deleteFriend,
  deleteUser,
} from 'redux/actions/profileActions';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    isLoading: false,
    isReady: false,
    errorCode: null,
    user: null,
    searchUsers: [],
    posts: [],
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
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(getUserProfile.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(searchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.searchUsers = payload;
      })
      .addCase(searchUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(updateAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAvatar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(updateAvatar.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(deleteAvatar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteAvatar.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(deleteAvatar.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(updateAlbum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAlbum.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(updateAlbum.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(deleteImageFromAlbum.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImageFromAlbum.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(deleteImageFromAlbum.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(addFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFriend.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(addFriend.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(deleteFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFriend.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(deleteFriend.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.user = payload;
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });
  },
});

export const { reset } = profileSlice.actions;

export default profileSlice.reducer;
