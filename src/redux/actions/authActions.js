import { storage } from 'storage';
import ClientAPI from 'services/ClientAPI';
import { Types as Alert } from './alertActions';

export const Types = {
  AUTH: 'AUTH_AUTH',
  GET_USER: 'AUTH_GET_USER',
  SET_USER: 'AUTH_SET_USER',
  DELETE_USER: 'AUTH_DELETE_USER',
  LOADING: 'AUTH_LOADING',
  LOGIN_SUCCESS: 'AUTH_LOGIN_SUCCESS',
  LOGIN_FAILED: 'AUTH_LOGIN_FAILED',
};

export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Alert.ALERT,
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
      type: Alert.ALERT,
      payload: {
        success: res.data.msg,
      },
    });

    dispatch({
      type: Alert.ALERT,
      payload: {
        loading: true,
      },
    });
    return Types.LOGIN_SUCCESS;
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });

    return Types.LOGIN_FAILED;
  }
};

export const register = (data) => async (dispatch) => {
  try {
    dispatch({ type: Alert.ALERT, payload: { loading: true } });

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
      type: Alert.ALERT,
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
      type: Alert.ALERT,
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
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};



export const getAuthUserProfile =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: Types.LOADING, payload: true });
      const res = await ClientAPI.getUser(id);

      dispatch({
        type: Types.GET_USER,
        payload: res.data,
      });

      dispatch({ type: Types.LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: Alert.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };
