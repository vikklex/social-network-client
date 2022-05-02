import { FriendsPost_Types } from 'redux/actions/friendPostsAction';

const defaultState = {
  friendPost: [],
  loading: false,
};

const postReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FriendsPost_Types.LOADING_FRIENDS_POSTS:
      return {
        ...state,
        loading: action.payload,
      };

    case FriendsPost_Types.GET_FRIENDS_POSTS:
      return {
        ...state,
        friendPost: action.payload,
      };

    default:
      return state;
  }
};
export default postReducer;
