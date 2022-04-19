import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';

export const Post_Types = {
  CREATE_POST: 'CREATE_POST',
  GET_POSTS: 'GET_POSTS',
  LOADING_POSTS: 'LOADING_POSTS',
};

export const createPost = (data) => async (dispatch) => {
  try {
    const res = await ClientAPI.createPost(data);
    dispatch({ type: Post_Types.CREATE_POST, payload: res.data });
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const getPosts = (data) => async (dispatch) => {
  try {
    dispatch({ type: Post_Types.LOADING_POSTS, payload: { loading: true } });
    const res = await ClientAPI.getUserPosts(data);
    dispatch({ type: Post_Types.GET_POSTS, payload: res.data });
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
