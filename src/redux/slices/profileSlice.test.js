import {
  getUserProfile,
  getAllUsers,
  searchUser,
  updateUser,
  blockUser,
  updateAvatar,
  deleteAvatar,
  updateAlbum,
  deleteImageFromAlbum,
  addFriend,
  deleteFriend,
  getUsersFromRegisterDate,
  deleteUser,
} from 'redux/actions/profileActions';

import profileSlice from 'redux/slices/profileSlice';

describe('Profile slice', () => {
  const initialState = {
    isLoading: false,
    errorCode: null,
    user: null,
    searchUsers: [],
  };

  it('Get user profile pending', async () => {
    const action = getUserProfile.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get user profile fulfilled', async () => {
    const data = {
      id: '6294b',
      is_admin: false,
      is_blocked: false,
      avatar: '/public/1653913528647-harry.jpeg',
      city: 'London',
      desc: 'Harry ',
      email: 'harry@mail.ru',
      first_name: 'Harry',
      from: 'London',
      gender: 'Male',
      job: 'Wizard',
      last_name: 'Potter',
      relationships: 'Married',
    };

    const action = { type: getUserProfile.fulfilled, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Get profile rejected', async () => {
    const data = 'error';

    const action = { type: getUserProfile.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Get all users pending', async () => {
    const action = getAllUsers.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get all users fulfilled', async () => {
    const action = getAllUsers.fulfilled;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Get all users rejected', async () => {
    const data = 'error';

    const action = { type: getAllUsers.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Search user pending', async () => {
    const action = searchUser.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Search user fulfilled', async () => {
    const data = [
      {
        id: '6294b',
        is_admin: false,
        is_blocked: false,
        avatar: '/public/1653913528647-harry.jpeg',
        city: 'London',
        desc: 'Harry ',
        email: 'harry@mail.ru',
        first_name: 'Harry',
        from: 'London',
        gender: 'Male',
        job: 'Wizard',
        last_name: 'Potter',
        relationships: 'Married',
      },
    ];
    const action = { type: searchUser.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: data,
      user: initialState.user,
    });
  });

  it('Search user rejected', async () => {
    const data = 'error';

    const action = { type: searchUser.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Update user pending', async () => {
    const action = updateUser.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Update user fulfilled', async () => {
    const data = [
      {
        id: '6294b',
        is_admin: false,
        is_blocked: false,
        avatar: '/public/1653913528647-harry.jpeg',
        city: 'London',
        desc: 'Harry ',
        email: 'harry@mail.ru',
        first_name: 'Harry',
        from: 'London',
        gender: 'Male',
        job: 'Wizard',
        last_name: 'Potter',
        relationships: 'Married',
      },
    ];
    const action = { type: updateUser.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Update user rejected', async () => {
    const data = 'error';

    const action = { type: updateUser.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Block user pending', async () => {
    const action = blockUser.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Block user fulfilled', async () => {
    const data = [
      {
        id: '2',
        is_admin: false,
        is_blocked: true,
        avatar: '/public/1653913528647-harry.jpeg',
        city: 'London',
      },
    ];
    const action = { type: blockUser.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Block user rejected', async () => {
    const data = 'error';

    const action = { type: blockUser.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Update avatar pending', async () => {
    const action = updateAvatar.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Update avatar fulfilled', async () => {
    const data = [
      {
        id: '3',
        is_admin: false,
        is_blocked: true,
        avatar: '/public/1653913528647-harry.jpeg',
        city: 'London',
      },
    ];
    const action = { type: updateAvatar.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Update avatar rejected', async () => {
    const data = 'error';

    const action = { type: updateAvatar.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Delete avatar pending', async () => {
    const action = deleteAvatar.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Delete avatar fulfilled', async () => {
    const data = [
      {
        id: '3',
        is_admin: false,
        is_blocked: true,
        avatar: '',
        city: 'London',
      },
    ];
    const action = { type: deleteAvatar.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Delete avatar rejected', async () => {
    const data = 'error';

    const action = { type: deleteAvatar.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Update album pending', async () => {
    const action = updateAlbum.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Update album fulfilled', async () => {
    const data = [
      {
        id: '3',
        album: [
          '/public/1653913528647-harry.jpeg',
          '/public/1653913528647-albus.jpeg',
        ],
      },
    ];
    const action = { type: updateAlbum.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Update album rejected', async () => {
    const data = 'error';

    const action = { type: updateAlbum.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Delete image from album pending', async () => {
    const action = deleteImageFromAlbum.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Delete image from album fulfilled', async () => {
    const data = [
      {
        id: '3',
        album: ['/public/1653913528647-harry.jpeg'],
      },
    ];
    const action = { type: deleteImageFromAlbum.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Delete image from album rejected', async () => {
    const data = 'error';

    const action = { type: deleteImageFromAlbum.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Add friend pending', async () => {
    const action = addFriend.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Add friend fulfilled', async () => {
    const data = [
      {
        id: '6294b',
        followers: ['2', '3'],
        followings: ['2', '3'],
      },
    ];
    const action = { type: addFriend.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Add friend rejected', async () => {
    const data = 'error';

    const action = { type: addFriend.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Delete friend pending', async () => {
    const action = deleteFriend.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Delete friend fulfilled', async () => {
    const data = [
      {
        id: '6294b',
        followers: ['2'],
        followings: ['2'],
      },
    ];
    const action = { type: deleteFriend.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Delete friend rejected', async () => {
    const data = 'error';

    const action = { type: deleteFriend.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Get users from register date pending', async () => {
    const action = getUsersFromRegisterDate.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get users from register date fulfilled', async () => {
    const action = { type: getUsersFromRegisterDate.fulfilled };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Get users from register date rejected', async () => {
    const data = 'error';

    const action = { type: getUsersFromRegisterDate.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });

  it('Delete user pending', async () => {
    const action = deleteUser.pending;
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Delete user fulfilled', async () => {
    const data = [
      {
        id: '6294b',
      },
    ];
    const action = { type: deleteUser.fulfilled, payload: data };
    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: null,
      searchUsers: initialState.searchUsers,
      user: data,
    });
  });

  it('Delete user rejected', async () => {
    const data = 'error';

    const action = { type: deleteUser.rejected, payload: data };

    const state = profileSlice(initialState, action);

    expect(state).toEqual({
      isLoading: false,
      errorCode: data,
      searchUsers: initialState.searchUsers,
      user: initialState.user,
    });
  });
});
