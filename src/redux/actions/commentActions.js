import ClientAPI from 'services/ClientAPI';
import { Types as Alert } from './alertActions';

export const Types = {
  CREATE_COMMENT: 'COMMENT_CREATE_COMMENT',
  GET_COMMENTS: 'COMMENT_GET_COMMENTS',
  LOADING_COMMENTS: 'COMMENT_LOADING_COMMENTS',
  DELETE_COMMENT: 'COMMENT_DELETE_COMMENT',
};

export const createComment =
  (userId, desc, postId, postAuthor) => async (dispatch) => {
    try {
      const res = await ClientAPI.createComment({
        userId,
        desc,
        postId,
        postAuthor,
      });
      dispatch({ type: Types.CREATE_COMMENT, payload: res.data });
      return res;
    } catch (error) {
      dispatch({
        type: Alert.ALERT,
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

export const getComments = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Types.LOADING_COMMENTS,
      payload: { loading: true },
    });
    const res = await ClientAPI.getComments(id);

    dispatch({ type: Types.GET_COMMENTS, payload: res.data });
    dispatch({ type: Types.LOADING_COMMENTS, payload: { loading: false } });
    return res;
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const updateComment = (id, userId, desc) => async (dispatch) => {
  try {
    dispatch({ type: Types.LOADING_COMMENTS, payload: { loading: true } });
    ClientAPI.updateComment(id, { userId, desc }).then((res) => {
      dispatch({
        type: Types.CREATE_COMMENT,
        payload: {
          comment: {
            ...res.data,
          },
        },
      });
    });

    dispatch({
      type: Types.LOADING_COMMENTS,
      payload: {
        loading: false,
      },
    });
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

//Why comment

export const deleteComment = (comment, userId) => async (dispatch) => {
  try {
    dispatch({ type: Types.DELETE_COMMENT, payload: comment });
    ClientAPI.deleteComment(comment.id, userId);
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
