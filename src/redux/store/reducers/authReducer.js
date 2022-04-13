import { Types } from '../../actions/authActions';

const defaultState = {};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.AUTH:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
