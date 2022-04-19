import { Post_Types } from './../../actions/postActions';

const defaultState = {
  post: [],
  loading: false,
};

const postReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Post_Types.CREATE_POST:
      return {
        ...state,
        post: [...state.post, action.payload],
      };
    case Post_Types.LOADING_POSTS:
      return {
        ...state,
        loading: action.payload,
      };
    case Post_Types.GET_POSTS:
      return {
        ...state,
        post: action.payload,
      };
    default:
      return state;
  }
};
export default postReducer;
