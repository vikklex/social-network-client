function createStorage(key) {
  return {
    Set: (value) => {
      localStorage.setItem(key, value);
    },
    Get: () => {
      const value = localStorage.getItem(key);
      return value;
    },
    Remove: () => {
      localStorage.removeItem(key);
    },
  };
}

export const storage = {
  accessToken: createStorage('token'),
};
