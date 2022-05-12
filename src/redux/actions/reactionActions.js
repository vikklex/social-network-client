import ClientAPI from 'services/ClientAPI';
import { Types as Alert } from './alertActions';

export const Reaction_Types = {
  CREATE_REACTION: 'REACTION_CREATE_REACTION',
  GET_POST_REACTIONS: 'REACTION_GET_POST_REACTIONS',
  GET_REACTIONS_FOR_USER: 'REACTION_GET_REACTIONS_FOR_USER',
  LOADING_REACTIONS: 'REACTION_LOADING_REACTIONS',
  SUCCESS: 'REACTION_SUCCESS',
  ERROR: 'REACTION_ERROR',
};

export const createReaction = (data) => async (dispatch) => {
  try {
    const res = await ClientAPI.createReaction({
      reactionType: data.reactionType,
      contentType: data.contentType,
      userId: data.userId,
      postId: data.postId,
      likedUser: data.likedUser,
    });

    dispatch({ type: Reaction_Types.CREATE_REACTION, payload: res.data });

    return res.data;
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const getPostReactions = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Reaction_Types.LOADING_REACTIONS,
      payload: true,
    });

    const res = await ClientAPI.getAllPostReactions(data);

    dispatch({ type: Reaction_Types.GET_POST_REACTIONS, payload: res.data });
    dispatch({
      type: Reaction_Types.LOADING_REACTIONS,
      payload: false,
    });

    return res.data;
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const getAllReactionsForUser = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Reaction_Types.LOADING_REACTIONS,
      payload: true,
    });

    const res = await ClientAPI.getAllReactionsForUser(data);

    dispatch({
      type: Reaction_Types.GET_REACTIONS_FOR_USER,
      payload: res.data,
    });
    dispatch({
      type: Reaction_Types.LOADING_REACTIONS,
      payload: false,
    });

    return res.data;
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};

export const getReactionsFromDate = (data) => async (dispatch) => {
  try {
    dispatch({
      type: Reaction_Types.LOADING_REACTIONS,
      payload: true,
    });

    const res = await ClientAPI.getReactionsFromDate({ data });

    dispatch({
      type: Reaction_Types.GET_REACTIONS_FOR_USER,
      payload: res.data,
    });
    dispatch({
      type: Reaction_Types.LOADING_REACTIONS,
      payload: false,
    });

    return res.data;
  } catch (error) {
    dispatch({
      type: Alert.ALERT,
      payload: {
        error: error.response.data.msg,
      },
    });
  }
};
