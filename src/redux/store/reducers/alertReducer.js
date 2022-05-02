import { Alert_Types } from 'redux/actions/alertActions';

const defaultState = {};

const alertReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Alert_Types.ALERT:
      return action.payload;

    default:
      return state;
  }
};

export default alertReducer;
