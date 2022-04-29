import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';
import { Types } from './authActions';

export const Profile_Types = {
  LOADING: 'PROFILE_LOADING',
  GET_USER: 'PROFILE_GET_USER',
  SET_USER: 'PROFILE_SET_USER',
  SUCCESS: 'PROFILE_SUCCESS',
  ADD_FRIEND: 'PROFILE_ADD_FRIEND',
  DELETE_FRIEND: 'PROFILE_DELETE_FRIEND',
};

const deleteData = (data, id) => {
  const newData = data.filter((value) => value.id !== id);
  return newData;
};

export const getUserProfile =
  ({ id }) =>
  async (dispatch) => {
    try {
      dispatch({ type: Profile_Types.LOADING, payload: { loading: true } });
      const res = await ClientAPI.getUser(id);

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
  };

export const setUserProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: Profile_Types.LOADING, payload: { loading: true } });
    const res = await ClientAPI.getUser(id);

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
};

export const updateUser =
  ({
    id,
    first_name,
    last_name,
    email,
    job,
    birthday,
    desc,
    gender,
    relationships,
    city,
    from,
    status,
  }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: Alert_Types.ALERT,
        payload: {
          loading: true,
        },
      });

      ClientAPI.updateUser(
        id,
        first_name,
        last_name,
        email,
        job,
        birthday,
        desc,
        gender,
        relationships,
        city,
        from,
        status,
      ).then((resp) => {
        dispatch({
          type: Types.SET_USER,
          payload: {
            user: resp.data.msg,
          },
        });
      });

      dispatch({
        type: Alert_Types.ALERT,
        payload: {
          loading: false,
        },
      });
      return Profile_Types.SUCCESS;
    } catch (error) {
      dispatch({
        type: Alert_Types.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

export const updateAvatar = (auth, user, data, config) => async (dispatch) => {
  try {
    dispatch({ type: Profile_Types.LOADING, payload: { loading: true } });

    ClientAPI.updateAvatar(user.id, data, config).then((res) =>
      dispatch({
        type: Profile_Types.SET_USER,
        payload: {
          ...auth,
          user: {
            ...user,
            ...res.data,
          },
        },
      }),
    );

    dispatch({ type: Profile_Types.LOADING, payload: { loading: false } });
    return Profile_Types.SUCCESS;
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const updateAlbum = (user, data, config) => async (dispatch) => {
  try {
    dispatch({ type: Profile_Types.LOADING, payload: { loading: true } });

    ClientAPI.updateAlbum(user.id, data, config).then((res) => {
      dispatch({
        type: Profile_Types.SET_USER,
        payload: {
          user: {
            ...user,
            ...res.data,
          },
        },
      });
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
};

export const addFriend = (data) => async (dispatch) => {
  const newUser = {
    ...data.user,
    followers: [...data.user.followers, data.profile],
  };

  dispatch({
    type: Profile_Types.ADD_FRIEND,
    payload: { user: newUser },
  });

  dispatch({
    type: Types.SET_USER,
    payload: {
      user: {
        ...data.profile,
        followings: [...data.profile.followings, newUser],
      },
    },
  });

  try {
    await ClientAPI.addFriend(data.profile.id, data.user.id);
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const deleteFriend = (data) => async (dispatch) => {
  const newUser = {
    ...data.user,
    followers: deleteData(data.user.followers, data.profile.id),
  };

  dispatch({
    type: Profile_Types.DELETE_FRIEND,
    payload: { user: newUser },
  });

  dispatch({
    type: Types.SET_USER,
    payload: {
      user: {
        ...data.profile,
        followings: deleteData(data.profile.followings, newUser.id),
      },
    },
  });
  try {
    await ClientAPI.deleteFriend(data.profile.id, data.user.id);
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
