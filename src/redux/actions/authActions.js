import ClientAPI from '../../utils/ClientAPI';
import { ALERT_TYPES } from './alertActions';
import Messages from '../../utils/Messages';

export const TYPES = {
  'AUTH': 'AUTH',
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await ClientAPI.postData('login', data);
    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.msg.access_token,
        user: res.data.msg.user,
        isAuth: true,
      },
    });

    localStorage.setItem('login', true);
    localStorage.setItem('token', res.data.msg.access_token);

    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    Messages.onSuccess('login');
  } catch (error) {
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
    Messages.onError('login');
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: ALERT_TYPES.ALERT, payload: { loading: true } });

    const res = await ClientAPI.postData('registration', data);

    localStorage.setItem('login', true);
    localStorage.setItem('token', res.data.msg.access_token);

    dispatch({
      type: TYPES.AUTH,
      payload: {
        token: res.data.msg.access_token,
        user: res.data.msg.user,
      },
    });
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        success: res.data.msg,
      },
    });
    Messages.onSuccess('registrate');
  } catch (error) {
    dispatch({
      type: ALERT_TYPES.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
    Messages.onError('register');
  }
};
