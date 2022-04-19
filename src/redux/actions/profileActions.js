import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';
import { Types } from './authActions';

export const Profile_Types = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
};

export const getUserProfile =
  ({ users, id }) =>
  async (dispatch) => {
    if (users.every((user) => user._id !== id)) {
      try {
        dispatch({ type: Profile_Types.LOADING, payload: { loading: true } });
        const res = await ClientAPI.getUser(`${id}`);

        dispatch({
          type: Profile_Types.GET_USER,
          payload: res.data,
        });

        dispatch({ type: Profile_Types.LOADING, payload: { loading: false } });
      } catch (error) {
        dispatch({
          type: Alert_Types.ALERT,
          payload: {
            error: error.response.data.msg,
          },
        });
      }
    }
  };

export const updateUser = (data, auth) => async (dispatch) => {
  try {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        loading: true,
      },
    });

    ClientAPI.updateUser(data, auth.user._id).then(
      dispatch({
        type: Types.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...data,
          },
        },
      }),
    );

    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        loading: false,
      },
    });
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
