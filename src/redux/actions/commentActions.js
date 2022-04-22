import ClientAPI from '../../utils/ClientAPI';
import { Alert_Types } from './alertActions';

export const Comment_Types = {
  CREATE_COMMENT: 'COMMENT_CREATE_COMMENT',
  GET_COMMENTS: 'COMMENT_GET_COMMENTS',
  LOADING_COMMENTS: 'COMMENT_LOADING_COMMENTS',
};

/*export const createPost = (data) => async (dispatch) => {
  try {
    const res = await ClientAPI.createPost({
      userId: data.userId,
      content: data.content,
    });
    dispatch({ type: Comment_Types.CREATE_COMMENT, payload: res.data });
    return res;
  } catch (error) {
    dispatch({
      type: Alert_Types.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};*/

export const getOneComment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: Comment_Types.LOADING_COMMENTS,
      payload: { loading: true },
    });
    const res = await ClientAPI.getOneComment(id);

    dispatch({ type: Comment_Types.GET_COMMENTS, payload: res.data });
    dispatch({ type: 'ALERT', payload: { loading: false } });
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
