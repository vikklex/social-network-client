const getReactionsData = (data, type) => {
  const counter = data.reduce((obj, data) => {
    if (!obj.hasOwnProperty(data.userId)) {
      obj[data.userId] = 0;
    }
    obj[data.userId]++;

    return obj;
  }, {});

  const result = Object.keys(counter).map((userId) => {
    let value = null;

    data.map((user) => {
      if (userId === user.userId) {
        value = {
          userId: userId,
          sum: counter[userId],
          type: type,
          userName: `${user.first_name} ${user.last_name}`,
          gender: `${user.gender}`,
        };
      }
    });
    return value;
  });

  return result;
};

export default getReactionsData;
