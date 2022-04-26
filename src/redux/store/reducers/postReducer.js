import { DeleteData } from '../../actions/alertActions';
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

    case Post_Types.DELETE_POST:
      return {
        ...state,
        post: DeleteData(state.post, action.payload.id),
      };
    default:
      return state;
  }
};
export default postReducer;
