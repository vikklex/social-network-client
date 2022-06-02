import commentSlice from 'redux/slices/commentSlice';

import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from 'redux/actions/commentAction';

describe('Comment slice', () => {
  const initialState = {
    isLoading: false,
    isReady: false,
    errorCode: null,
    comment: [],
  };

  it('Create comment pending', async () => {
    const action = createComment.pending;
    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Create comment fulfilled', async () => {
    const data = {
      id: '6',
      postId: '2',
      userId: '6',
      postAuthor: '6',
      desc: '👒🌍🌎',
    };

    const action = { type: createComment.fulfilled, payload: data };

    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      comment: [...initialState.comment, data],
      isLoading: false,
    });
  });

  it('Create comment rejected', async () => {
    const data = 'error';

    const action = { type: createComment.rejected, payload: data };

    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });

  it('Get comments pending', async () => {
    const action = getComments.pending;
    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get comments fulfilled', async () => {
    const data = {
      id: '6',
      postId: '2',
      userId: '6',
      postAuthor: '6',
      desc: '👒🌍🌎',
    };

    const action = { type: getComments.fulfilled, payload: data };

    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      comment: data,
      isLoading: false,
    });
  });

  it('Get comments rejected', async () => {
    const data = 'error';

    const action = { type: getComments.rejected, payload: data };

    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });

  it('Update comment pending', async () => {
    const action = updateComment.pending;
    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Update comment fulfilled', async () => {
    const data = {
      id: '6',
      postId: '2',
      userId: '6',
      postAuthor: '6',
      desc: '👒🌍🌎',
    };

    const action = { type: updateComment.fulfilled, payload: data };

    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      isReady: false,
      comment: initialState.comment,
    });
  });

  it('Update comment rejected', async () => {
    const data = 'error';

    const action = { type: updateComment.rejected, payload: data };

    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });

  it('Delete comment pending', async () => {
    const action = deleteComment.pending;
    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Delete comment fulfilled', async () => {
    const data = {
      id: '6',
    };

    const action = { type: deleteComment.fulfilled, payload: data };

    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      isReady: false,
      comment: [{ ...data }],
    });
  });

  it('Delete comment rejected', async () => {
    const data = 'error';

    const action = { type: deleteComment.rejected, payload: data };

    const state = commentSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });
});
