import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';

export const Types = {
  AUTH: 'AUTH',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILED: 'LOGIN_FAILED',
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        loading: true,
      },
    });

    const res = await ClientAPI.login(data);

    dispatch({
      type: Types.AUTH,
      payload: {
        token: res.data.msg.access_token,
        user: res.data.msg.user,
        isAuth: true,
      },
    });

    localStorage.setItem('login', true);
    localStorage.setItem('token', res.data.msg.access_token);

    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    return Types.LOGIN_SUCCESS;
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });

    return Types.LOGIN_FAILED;
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: Alert_Types.ALERT, payload: { loading: true } });

    const res = await ClientAPI.register(data);

    localStorage.setItem('login', true);
    localStorage.setItem('token', res.data.msg.access_token);

    dispatch({
      type: Types.AUTH,
      payload: {
        token: res.data.msg.access_token,
        user: res.data.msg.user,
      },
    });
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    return Types.LOGIN_SUCCESS;
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });

    return Types.LOGIN_FAILED;
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('login');
    localStorage.removeItem('token');
    await ClientAPI.logout();

    window.location.href = '/login';
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
