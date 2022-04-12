import { ALERT_TYPES } from '../../actions/alertActions';

const defaultState = {};

const alertReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ALERT_TYPES.ALERT:
      return action.payload;

    default:
      return state;
  }
};

export default alertReducer;
