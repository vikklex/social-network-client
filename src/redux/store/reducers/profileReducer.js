import { Profile_Types } from 'redux/actions/profileActions';

const defaultState = {
  loading: false,
  user: null,
  searchUsers: [],
  posts: [],
};

const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Profile_Types.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case Profile_Types.GET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case Profile_Types.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };

    case Profile_Types.SEARCH_USER:
      return {
        ...state,
        searchUsers: action.payload,
      };
    case Profile_Types.ADD_FRIEND:
      return {
        ...state,
        user: action.payload.user,
      };

    case Profile_Types.DELETE_FRIEND:
      return {
        ...state,
        user: action.payload.user,
      };

    default:
      return state;
  }
};

export default profileReducer;
