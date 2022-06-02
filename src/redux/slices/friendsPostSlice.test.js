import { getFriendsPosts } from 'redux/actions/friendsPostAction';
import friendsPostSlice from 'redux/slices/friendsPostSlice';

describe('Friend post slice', () => {
  const initialState = {
    isLoading: false,
    isReady: false,
    errorCode: null,
    user: null,

    friendsPosts: [],
  };

  it('Set status pending', async () => {
    const action = getFriendsPosts.pending;
    const state = friendsPostSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it('Set status fullfilled', async () => {
    const data = [
      {
        id: '1',
        userId: '1',
        first_name: 'Sirius',
        last_name: 'Black',
        avatar:
          '/public/1654023606326-wb-hp-f5-order-of-phoenix-sirius-black-web-landscape.jpeg',
        desc: 'hi!',
        img: [],
      },

      {
        id: '2',
        userId: '1',
        first_name: 'Sirius',
        last_name: 'Black',
        avatar:
          '/public/1654023606326-wb-hp-f5-order-of-phoenix-sirius-black-web-landscape.jpeg',
        desc: 'hi!',
        img: [],
      },
    ];

    const action = { type: getFriendsPosts.fulfilled, payload: data };

    const state = friendsPostSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      friendsPosts: data,
      isLoading: false,
    });
  });

  it('Set status rejected', async () => {
    const data = 'error';

    const action = { type: getFriendsPosts.rejected, payload: data };

    const state = friendsPostSlice(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      errorCode: data,
    });
  });
});
