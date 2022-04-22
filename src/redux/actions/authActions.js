import { storage } from '../../storage';
import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';

export const Types = {
  AUTH: 'AUTH_AUTH',
  GET_USER: 'AUTH_GET_USER',
  LOADING: 'AUTH_LOADING',
  LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  LOGIN_FAILED: 'AUTH_LOGIN_FAILED',
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

    storage.accessToken.Set(res.data.msg.access_token);

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

    storage.accessToken.Set(res.data.msg.access_token);

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

    return {
      status: Types.LOGIN_SUCCESS,
      user: res.data.msg.user,
      token: res.data.msg.access_token,
    };
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
    storage.accessToken.Remove();

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

export const getUserProfile =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: Types.LOADING, payload: { loading: true } });
      const res = await ClientAPI.getUser(id);

      dispatch({
        type: Types.GET_USER,
        payload: res.data,
      });

      dispatch({ type: Types.LOADING, payload: { loading: false } });
    } catch (error) {
      dispatch({
        type: Alert_Types.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };
