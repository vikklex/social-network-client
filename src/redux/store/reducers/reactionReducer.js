import { Reaction_Types } from '../../actions/reactionActions';

const defaultState = {
  reactions: [],
  loading: false,
};

const reactionReducer = (state = defaultState, action) => {
  switch (action.type) {
    case Reaction_Types.CREATE_REACTION:
      return {
        ...state,
        reactions: [...state.reactions, action.payload],
      };
    case Reaction_Types.LOADING_REACTIONS:
      return {
        ...state,
        loading: action.payload,
      };
    case Reaction_Types.GET_POST_REACTIONS:
      return {
        ...state,
      };

    default:
      return state;
  }
};
export default reactionReducer;
