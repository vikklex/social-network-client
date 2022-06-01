export const getPercentOfUserWithFriends = (totalUserNumber) => {
  const userWithFriends = [];

  if (totalUserNumber) {
    for (const user of totalUserNumber) {
      if (user.followers.length > 0 || user.followings.length > 0) {
        userWithFriends.push(user);
      }
    }
  }

  const percent = (
    (100 * userWithFriends.length) /
    totalUserNumber.length
  ).toFixed(1);

  return percent;
};
