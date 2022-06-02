import { storage } from 'storage';

import authSlice from 'redux/slices/authSlice';
import { getProfile, login, register } from 'redux/actions/authActions';

describe('Auth login slice', () => {
  const initialState = {
    isLoading: false,
    isReady: false,
    profile: null,
    token: storage.accessToken.Get(),
    isLoggedIn: storage.accessToken.Get() !== null,
    errorCode: null,
  };

  it('Login pending', async () => {
    const action = login.pending;
    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Login fulfilled', async () => {
    const data = {
      token: '123456jdjjd',
    };
    const action = { type: login.fulfilled, payload: data };

    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: null,
      token: data.token,
      isLoggedIn: true,
    });
  });

  it('Login rejected', async () => {
    const data = 'error';

    const action = { type: login.rejected, payload: data };

    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });

  it('Register pending', async () => {
    const action = register.pending;
    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Register fulfilled', async () => {
    const data = {
      token: '123456jdjjd',
    };
    const action = { type: register.fulfilled, payload: data };

    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: null,
      token: data.token,
      isLoggedIn: true,
    });
  });

  it('Register rejected', async () => {
    const data = 'error';

    const action = { type: register.rejected, payload: data };

    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
      isLoggedIn: false,
    });
  });

  it('Get profile pending', async () => {
    const action = getProfile.pending;
    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Get profile fulfilled', async () => {
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

    const action = { type: getProfile.fulfilled, payload: data };

    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: null,
      profile: data,
      isLoggedIn: false,
      isReady: true,
    });
  });

  it('Get profile rejected', async () => {
    const data = 'error';

    const action = { type: getProfile.rejected, payload: data };

    const state = authSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
      isLoggedIn: false,
    });
  });

  it('Logout', () => {
    const state = authSlice(initialState, 'logout');

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: null,
      isLoggedIn: false,
    });
  });
});
