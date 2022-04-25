import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';

export const Post_Types = {
  CREATE_POST: 'POST_CREATE_POST',
  GET_POSTS: 'POST_GET_POSTS',
  LOADING_POSTS: 'POST_LOADING_POSTS',
};

export const createPost = (data) => async (dispatch) => {
  try {
    const res = await ClientAPI.createPost({
      userId: data.userId,
      content: data.content,
    });

    dispatch({ type: Post_Types.CREATE_POST, payload: res.data });
    return res;
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

export const updatePost = (id, userId, desc) => async (dispatch) => {
  try {
    dispatch({ type: Post_Types.LOADING_POSTS, payload: { loading: true } });
    ClientAPI.updatePost(id, { userId, desc }).then((res) => {
      dispatch({
        type: Post_Types.CREATE_POST,
        payload: {
          post: {
            ...res.data,
          },
        },
      });
    });

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

export const updatePostImage = (id, data, config) => async (dispatch) => {
  try {
    dispatch({ type: Post_Types.LOADING_POSTS, payload: { loading: true } });
    ClientAPI.updatePostImage(id, data, config).then((res) => {
      dispatch({
        type: Post_Types.CREATE_POST,
        payload: {
          post: {
            ...res.data,
          },
        },
      });
    });

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
