import {
  createUserConversation,
  getUserConversations,
} from 'redux/actions/conversationActions';

import conversationSlice from 'redux/slices/conversationSlice';

describe('Conversation slice', () => {
  const initialState = {
    isLoading: false,
    errorCode: null,
    conversations: [],
    currentChat: null,
  };

  it('Get conversation pending', async () => {
    const action = getUserConversations.pending;
    const state = conversationSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get message fulfilled', async () => {
    const data = [
      {
        id: '1',
        participants: ['2', '3'],
      },
    ];

    const action = { type: getUserConversations.fulfilled, payload: data };

    const state = conversationSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      conversations: data,
      isLoading: false,
    });
  });

  it('Get conversation rejected', async () => {
    const data = 'error';

    const action = { type: getUserConversations.rejected, payload: data };

    const state = conversationSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });

  it('Create conversation pending', async () => {
    const action = createUserConversation.pending;
    const state = conversationSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Create conversation fulfilled', async () => {
    const data = {
      id: '1',
      participants: ['2', '3'],
    };

    const action = { type: createUserConversation.fulfilled, payload: data };

    const state = conversationSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      conversations: [{ ...data }],
      isLoading: false,
      currentChat: data,
    });
  });

  it('Create conversation rejected', async () => {
    const data = 'error';

    const action = { type: createUserConversation.rejected, payload: data };

    const state = conversationSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });
});
