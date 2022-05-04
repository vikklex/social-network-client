import { Types } from 'redux/actions/alertActions';

const defaultState = {};

const alertReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.ALERT:
      return action.payload;

    default:
      return state;
  }
};

export default alertReducer;
