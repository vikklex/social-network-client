import { Types } from 'redux/actions/meetingAction';
import { DeleteData } from 'redux/actions/alertActions';

const defaultState = {
  meetings: [],
  loading: false,
};

const meetingReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Types.CREATE_MEETING:
      return {
        ...state,
        meetings: [...state.meetings, action.payload],
      };

    case Types.LOADING_MEETINGS:
      return {
        ...state,
        loading: action.payload,
      };

    case Types.GET_MEETINGS:
      return {
        ...state,
        meetings: action.payload,
      };

    case Types.DELETE_MEETING:
      return {
        ...state,
        meetings: DeleteData(state.meetings, action.payload.id),
      };

    default:
      return state;
  }
};
export default meetingReducer;
