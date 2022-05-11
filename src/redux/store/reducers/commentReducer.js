import { Types } from 'redux/actions/commentActions';
import { DeleteData } from 'redux/actions/alertActions';

const defaultState = {
  comment: [],
  loading: false,
};

const commentReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.CREATE_COMMENT:
      return {
        ...state,
        comment: [...state.comment, action.payload],
      };

    case Types.LOADING_COMMENTS:
      return {
        ...state,
        loading: action.payload,
      };

    case Types.GET_COMMENTS:
      return {
        ...state,
        comment: action.payload,
      };

    case Types.DELETE_MEETING:
      return {
        ...state,
        comment: DeleteData(state.comment, action.payload.id),
      };

    default:
      return state;
  }
};
export default commentReducer;
