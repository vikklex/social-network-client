import ClientAPI from 'services/ClientAPI';
import { Types as Alert } from './alertActions';

export const Types = {
  CREATE_MEETING: 'MEETING_CREATE_MEETING',
  GET_MEETINGS: 'MEETING_GET_MEETINGS',
  LOADING_MEETING: 'MEETING_LOADING_MEETINGS',
  DELETE_MEETING: 'MEETING_DELETE_MEETING',
  SUCCESS: 'MEETING_SUCCESS',
  ERROR: 'MEETING_ERROR',
};

export const createMeeting = (data) => async (dispatch) => {
  try {
    const res = await ClientAPI.createMeeting({ data });

    dispatch({ type: Types.CREATE_MEETING, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const getMeetings = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Types.LOADING_MEETING,
      payload: true,
    });

    const res = await ClientAPI.getMeetings(data);

    dispatch({ type: Types.GET_MEETINGS, payload: res.data });
    dispatch({
      type: Types.LOADING_MEETING,
      payload: false,
    });

    return res.data;
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const deleteMeeting = (meeting, userId) => async (dispatch) => {
  try {
    dispatch({ type: Types.DELETE_MEETING, payload: meeting });
    ClientAPI.deleteMeeting(meeting.id, { userId });
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data,
      },
    });
  }
};
