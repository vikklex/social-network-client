import ClientAPI from 'services/ClientAPI';
import { Types as Alert } from './alertActions';

export const Types = {
  CREATE_MEETING: 'MEETING_CREATE_MEETING',
  GET_MEETINGS: 'MEETING_GET_MEETINGS',
  SET_MEETING: 'MEETING_SET_MEETINGS',
  LOADING_MEETING: 'MEETING_LOADING_MEETINGS',
  DELETE_MEETING: 'MEETING_DELETE_MEETING',
  SUCCESS: 'MEETING_SUCCESS',
  ERROR: 'MEETING_ERROR',
};

export const createMeeting =
  (
    userId,
    participants,
    title,
    description,
    importance,
    date,
    startTime,
    endTime,
  ) =>
  async (dispatch) => {
    try {
      const res = await ClientAPI.createMeeting(
        userId,
        participants,
        title,
        description,
        importance,
        date,
        startTime,
        endTime,
      );

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

export const setMeetings = (id) => async (dispatch) => {
  try {
    dispatch({ type: Types.LOADING, payload: { loading: true } });
    const res = await ClientAPI.getMeetings(id);

    dispatch({
      type: Types.GET_MEETINGS,
      payload: res.data,
    });

    dispatch({ type: Types.LOADING, payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const updateMeeting = (data) => async (dispatch) => {
  try {
    dispatch({ type: Types.LOADING_MEETING, payload: { loading: true } });
    ClientAPI.updateMeeting(
      data.id,
      data.userId,
      data.participants,
      data.title,
      data.description,
      data.importance,
      data.date,
      data.startTime,
      data.endTime,
    ).then((res) => {
      dispatch({
        type: Types.SET_MEETING,
        payload: res.data,
      });
    });

    dispatch({
      type: Types.LOADING_MEETING,
      payload: {
        loading: false,
      },
    });
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
