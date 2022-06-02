import { createMeeting } from 'redux/actions/meetingAction';
import meetingSlice from 'redux/slices/meetingSlice';
import {
  deleteMeeting,
  getMeetings,
  updateMeeting,
} from '../actions/meetingAction';
import { DeleteData } from './meetingSlice';

describe('Meeting slice', () => {
  const initialState = {
    isLoading: false,
    errorCode: null,
    meetings: [],
  };

  it('Create meeting pending', async () => {
    const action = createMeeting.pending;
    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Create meeting fullfilled', async () => {
    const data = {
      id: '1',
      userId: 2,
    };

    const action = { type: createMeeting.fulfilled, payload: data };

    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      meetings: [...initialState.meetings, data],
      errorCode: null,
    });
  });

  it('Create meeting rejected', async () => {
    const data = 'error';

    const action = { type: createMeeting.rejected, payload: data };

    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      meetings: initialState.meetings,
    });
  });

  it('Get meetings pending', async () => {
    const action = getMeetings.pending;
    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get meetings fulfilled', async () => {
    const data = {
      id: '1',
      userId: 2,
    };

    const action = { type: getMeetings.fulfilled, payload: data };

    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      meetings: data,
      errorCode: null,
    });
  });

  it('Get meetings rejected', async () => {
    const data = 'error';

    const action = { type: getMeetings.rejected, payload: data };

    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      meetings: initialState.meetings,
    });
  });

  it('Update meeting pending', async () => {
    const action = updateMeeting.pending;
    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Update meeting fulfilled', async () => {
    const action = { type: updateMeeting.fulfilled };

    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      meetings: initialState.meetings,
    });
  });

  it('Update meeting rejected', async () => {
    const data = 'error';

    const action = { type: updateMeeting.rejected, payload: data };

    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      meetings: initialState.meetings,
    });
  });

  it('Delete meeting pending', async () => {
    const action = deleteMeeting.pending;
    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Delete meeting fulfilled', async () => {
    const data = {
      id: '1',
      userId: 2,
    };

    const action = { type: deleteMeeting.fulfilled, payload: data };

    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      meetings: DeleteData(state.meetings, data.id),
    });
  });

  it('Delete meeting rejected', async () => {
    const data = 'error';

    const action = { type: updateMeeting.rejected, payload: data };

    const state = meetingSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      meetings: initialState.meetings,
    });
  });
});
