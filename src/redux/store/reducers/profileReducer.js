import { Profile_Types } from './../../actions/profileActions';

const defaultState = {
  loading: false,
  users: [],
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
        users: [...state.users, action.payload.user],
      };
    default:
      return state;
  }
};

export default profileReducer;
