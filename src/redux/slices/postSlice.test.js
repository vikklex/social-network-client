import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  updatePostImage,
} from 'redux/actions/postActions';

import postSlice from 'redux/slices/postSlice';
import { DeleteData } from './postSlice';

describe('Post slice', () => {
  const initialState = {
    isLoading: false,
    errorCode: null,

    post: [],
  };

  it('Create post pending', async () => {
    const action = createPost.pending;
    const state = postSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Create post fulfilled', async () => {
    const data = {
      id: '1',
      userId: 2,
    };

    const action = { type: createPost.fulfilled, payload: data };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      post: [...initialState.post, data],
      errorCode: null,
    });
  });

  it('Create post rejected', async () => {
    const data = 'error';

    const action = { type: createPost.rejected, payload: data };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      post: initialState.post,
    });
  });

  it('Get posts pending', async () => {
    const action = getPosts.pending;
    const state = postSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get posts fulfilled', async () => {
    const data = {
      id: '1',
      userId: 2,
    };

    const action = { type: getPosts.fulfilled, payload: data };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      post: data,
    });
  });

  it('Get posts rejected', async () => {
    const data = 'error';

    const action = { type: getPosts.rejected, payload: data };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      post: initialState.post,
    });
  });

  it('Update post pending', async () => {
    const action = updatePost.pending;
    const state = postSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Update post fulfilled', async () => {
    const action = { type: updatePost.fulfilled };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      post: initialState.post,
    });
  });

  it('Update post rejected', async () => {
    const data = 'error';

    const action = { type: updatePost.rejected, payload: data };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      post: initialState.post,
    });
  });

  it('Delete post pending', async () => {
    const action = deletePost.pending;
    const state = postSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Delete post fulfilled', async () => {
    const data = {
      id: '1',
    };

    const action = { type: deletePost.fulfilled };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      post: DeleteData(state.post, data.id),
    });
  });

  it('Delete post rejected', async () => {
    const data = 'error';

    const action = { type: deletePost.rejected, payload: data };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      post: initialState.post,
    });
  });

  it('Update post image pending', async () => {
    const action = updatePostImage.pending;
    const state = postSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Update post image fulfilled', async () => {
    const action = { type: updatePostImage.fulfilled };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      post: initialState.post,
    });
  });

  it('Update post image rejected', async () => {
    const data = 'error';

    const action = { type: updatePostImage.rejected, payload: data };

    const state = postSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      post: initialState.post,
    });
  });
});
