import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';

export const FriendsPost_Types = {
  GET_FRIENDS_POSTS: 'FRIENDS_POST_GET_FRIEND_POSTS',
  LOADING_FRIENDS_POSTS: 'FRIENDS_POST_LOADING_POSTS',
};

export const getFriendsPosts = (data) => async (dispatch) => {
  try {
    dispatch({
      type: FriendsPost_Types.LOADING_FRIENDS_POSTS,
      payload: { loading: true },
    });

    const res = await ClientAPI.getFriendsPosts(data);

    dispatch({ type: FriendsPost_Types.GET_FRIENDS_POSTS, payload: res.data });
    dispatch({ type: 'ALERT', payload: { loading: false } });
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
