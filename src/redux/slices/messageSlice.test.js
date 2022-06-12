import { getUserMessages, createMessage } from 'redux/actions/messageAction';
import messageSlice from 'redux/slices/messageSlice';

describe('Message slice', () => {
  const initialState = {
    isLoading: false,
    errorCode: null,
    messages: [],
  };

  it('Get message pending', async () => {
    const action = getUserMessages.pending;
    const state = messageSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get message fulfilled', async () => {
    const data = [
      {
        id: '1',
        text: 'he!',
        senderId: '2',
        receiverId: '3',
      },
    ];

    const action = { type: getUserMessages.fulfilled, payload: data };

    const state = messageSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      messages: data,
      isLoading: false,
    });
  });

  it('Get message rejected', async () => {
    const data = 'error';

    const action = { type: getUserMessages.rejected, payload: data };

    const state = messageSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });

  it('Create message pending', async () => {
    const action = createMessage.pending;
    const state = messageSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Create message fulfilled', async () => {
    const data = {
      id: '1',
      text: 'he!',
      senderId: '2',
      receiverId: '3',
    };

    const action = { type: createMessage.fulfilled, payload: data };

    const state = messageSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      messages: [...initialState.messages, data],
      isLoading: false,
    });
  });

  it('Create message rejected', async () => {
    const data = 'error';

    const action = { type: createMessage.rejected, payload: data };

    const state = messageSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });
});
