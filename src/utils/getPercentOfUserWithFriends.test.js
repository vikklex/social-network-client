import { getPercentOfUserWithFriends } from 'utils/getPercentOfUserWithFriends';

describe('Get percent of users with friends', () => {
  it('Get 100 percent of users with friends', () => {
    const input = [
      {
        id: '7',
        followers: ['1', '2', '3'],
        followings: ['4', '5', '6'],
      },

      {
        id: '8',
        followers: ['1', '2', '3'],
        followings: ['4', '5', '6'],
      },
    ];

    const output = '100.0';

    expect(getPercentOfUserWithFriends(input)).toEqual(output);
  });

  it('Get 50 percent of users with friends', () => {
    const input = [
      {
        id: '7',
        followers: ['1', '2', '3'],
        followings: ['4', '5', '6'],
      },

      {
        id: '8',
        followers: [],
        followings: [],
      },
    ];

    const output = '50.0';

    expect(getPercentOfUserWithFriends(input)).toEqual(output);
  });
});
