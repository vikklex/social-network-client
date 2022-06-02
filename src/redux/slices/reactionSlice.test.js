import {
  createReaction,
  getAllReactionsForUser,
  getPostReactions,
} from 'redux/actions/reactionAction';

import reactionSlice from 'redux/slices/reactionSlice';

describe('Profile slice', () => {
  const initialState = {
    isLoading: false,
    reactions: [],
    errorCode: null,
  };

  it('Create reaction pending', async () => {
    const action = createReaction.pending;
    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Create reaction fulfilled', async () => {
    const action = createReaction.fulfilled;
    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      reactions: [{}],
    });
  });

  it('Create reaction rejected', async () => {
    const data = 'error';

    const action = { type: createReaction.rejected, payload: data };

    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      reactions: initialState.reactions,
    });
  });

  it('Get post reactions pending', async () => {
    const action = getPostReactions.pending;
    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get post reactions fulfilled', async () => {
    const action = getPostReactions.fulfilled;
    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      reactions: [{}],
    });
  });

  it('Get post reactions rejected', async () => {
    const data = 'error';

    const action = { type: getPostReactions.rejected, payload: data };

    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      reactions: initialState.reactions,
    });
  });

  it('Get all reactions pending', async () => {
    const action = getAllReactionsForUser.pending;
    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get all reactions fulfilled', async () => {
    const action = getAllReactionsForUser.fulfilled;
    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      reactions: [{}],
    });
  });

  it('Get all reactions rejected', async () => {
    const data = 'error';

    const action = { type: getAllReactionsForUser.rejected, payload: data };

    const state = reactionSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      reactions: initialState.reactions,
    });
  });
});
