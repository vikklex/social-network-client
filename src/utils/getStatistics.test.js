import moment from 'moment';

import getStatistics from './getStatistics';

const LIKE_TYPE = 'like';

describe('Statistics', () => {
  it('Get statistics', () => {
    const date = moment().toISOString();

    const input = [
      {
        createdAt: date,
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },
      {
        createdAt: date,
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date,
        userId: '1',
      },
    ];

    const output = {
      name: '2022-05-17',
      value: 3,
    };

    expect(getStatistics(input, date, date)).toEqual(output);
  });
});
