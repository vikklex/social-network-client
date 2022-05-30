import { createSlice } from '@reduxjs/toolkit';

import {
  createMeeting,
  deleteMeeting,
  getMeetings,
  updateMeeting,
} from 'redux/actions/meetingAction';

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item.id !== id);
  return newData;
};

const meetingSlice = createSlice({
  name: 'meeting',
  initialState: {
    isLoading: false,
    isReady: false,
    errorCode: null,

    meetings: [],
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
      .addCase(createMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMeeting.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.meetings.push({ ...payload });
      })
      .addCase(createMeeting.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(getMeetings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMeetings.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.meetings = payload;
      })
      .addCase(getMeetings.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(updateMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMeeting.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
      })
      .addCase(updateMeeting.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });

    builder
      .addCase(deleteMeeting.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMeeting.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isLoggedIn = true;
        state.errorCode = null;
        state.meetings = DeleteData(state.meetings, payload.id);
      })
      .addCase(deleteMeeting.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.errorCode = payload;
      });
  },
});

export const { reset } = meetingSlice.actions;

export default meetingSlice.reducer;
