import { TYPES } from '../../actions/authActions';

const defaultState = {};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case TYPES.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
