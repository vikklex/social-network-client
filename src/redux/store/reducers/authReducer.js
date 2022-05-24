import { storage } from 'storage';
import { Types } from 'redux/actions/authActions';

const defaultState = {
  loading: false,
  profile: null,
  token: storage.accessToken.Get(),
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.AUTH:
      return action.payload;

    case Types.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case Types.GET_USER:
      return {
        ...state,
        profile: action.payload.user,
      };

    case Types.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case Types.DELETE_USER:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export default authReducer;
