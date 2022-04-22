import { Comment_Types } from './../../actions/commentActions';

const defaultState = {
  comment: [],
  loading: false,
};

const commentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Comment_Types.CREATE_COMMENT:
      return {
        ...state,
        comment: [...state.comment, action.payload],
      };
    case Comment_Types.LOADING_COMMENTS:
      return {
        ...state,
        loading: action.payload,
      };
    case Comment_Types.GET_COMMENTS:
      return {
        ...state,
        comment: action.payload,
      };
    default:
      return state;
  }
};
export default commentReducer;
