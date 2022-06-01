export const getUsersWithComplitedProfile = (totalUserNumber) => {
  const userWithCompletedProfile = [];

  if (totalUserNumber) {
    for (const user of totalUserNumber) {
      if (
        user.desc &&
        user.city &&
        user.gender &&
        user.job &&
        user.from &&
        user.birthday
      ) {
        userWithCompletedProfile.push(user);
      }
    }
  }

  const percent = (
    (100 * userWithCompletedProfile.length) /
    totalUserNumber.length
  ).toFixed(1);

  return percent;
};
