function createStorage(key) {
  return {
    Set: (value) => {
      localStorage.setItem(key, value);
    },
    Get: () => {
      return localStorage.getItem(key);
    },
    Remove: () => {
      localStorage.removeItem(key);
    },
  };
}

export const storage = {
  accessToken: createStorage('token'),
};
