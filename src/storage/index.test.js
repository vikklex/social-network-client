import { storage } from './index';

import LocalStorageMock from '../tests/LocalStorageMock';

global.localStorage = new LocalStorageMock();

describe('Storage', () => {
  it('Access token', () => {
    const accessToken = 'accessToken';

    storage.accessToken.Set(accessToken);

    expect(storage.accessToken.Get()).toEqual(accessToken);

    storage.accessToken.Remove();

    expect(storage.accessToken.Get()).toBeNull();
  });
});
