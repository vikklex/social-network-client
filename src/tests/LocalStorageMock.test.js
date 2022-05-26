import LocalStorageMock from '../tests/LocalStorageMock';

describe('Storage mock', () => {
  it('Local storage test', () => {
    const localStorageMock = new LocalStorageMock();
    const accessTokenKey = 'accessToken';

    localStorageMock.setItem(accessTokenKey, '1');

    expect(localStorageMock.getItem(accessTokenKey)).toEqual('1');

    localStorageMock.removeItem(accessTokenKey);

    expect(localStorageMock.getItem(accessTokenKey)).toBeNull();

    localStorageMock.clear();
  });
});
