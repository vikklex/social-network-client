import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';

export const Profile_Types = {
  LOADING: 'LOADING',
  GET_USER: 'GET_USER',
};

export const getUserProfile =
  ({ users, id }) =>
  async (dispatch) => {
    //console.log({ users, id, auth });
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
