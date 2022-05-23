import { storage } from './index';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }

  removeItem(key) {
    delete this.store[key];
  }
}

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
