import { createAsyncThunk } from '@reduxjs/toolkit';

import extractError from 'utils/extractError';
import ClientAPI from 'services/ClientAPI';

const deleteData = (data, id) => {
  const newData = data.filter((value) => value !== id);
  return newData;
};

const filterData = (data, id) => {
  return data.includes(id) ? data : [...data, id];
};

export const getUserProfile = createAsyncThunk(
  'profile/getUser',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getUser(data);

      return res.data.user;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getAllUsers = createAsyncThunk(
  'profile/getAllUsers',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getAllUsers(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const searchUser = createAsyncThunk(
  'profile/searchUser',

  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.searchUser(data.value, data.id);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.updateUser(data);

      return res.data.msg;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const blockUser = createAsyncThunk(
  'profile/blockUser',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.blockUser(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const updateAvatar = createAsyncThunk(
  'profile/updateAvatar',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.updateAvatar(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const deleteAvatar = createAsyncThunk(
  'profile/deleteAvatar',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.deleteAvatar(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const updateAlbum = createAsyncThunk(
  'profile/updateAlbum',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.updateAlbum(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const deleteImageFromAlbum = createAsyncThunk(
  'profile/deleteImageFromAlbum',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.deleteImageFromAlbum(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const addFriend = createAsyncThunk(
  'profile/addFriend',
  async (data, { rejectWithValue }) => {
    try {
      const newUser = {
        ...data.user,
        followers: filterData(data.user.followers, data.profile.id),
      };
      await ClientAPI.addFriend(data);

      return newUser;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const deleteFriend = createAsyncThunk(
  'profile/delete',
  async (data, { rejectWithValue }) => {
    try {
      const newUser = {
        ...data.user,
        followers: deleteData(data.user.followers, data.profile.id),
      };

      await ClientAPI.deleteFriend(data);

      return newUser;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const getUsersFromRegisterDate = createAsyncThunk(
  'profile/getUsersFromDate',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.getUsersFromRegisterDate(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);

export const deleteUser = createAsyncThunk(
  'profile/deleteUser',
  async (data, { rejectWithValue }) => {
    try {
      const res = await ClientAPI.deleteUser(data);

      return res.data;
    } catch (err) {
      return rejectWithValue(extractError(err));
    }
  },
);
