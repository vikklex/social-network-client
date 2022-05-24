import moment from 'moment';

import { DATE_FULL_FORMAT } from './Constants';

import getStatistics from './getStatistics';

const LIKE_TYPE = 'like';

describe('Statistics', () => {
  it('Get statistics', () => {
    const date = moment();

    const input = [
      {
        createdAt: date.toISOString(),
        id: '1',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },
      {
        createdAt: date.toISOString(),
        id: '2',
        likedUser: '2',
        postId: '3',
        reactionType: LIKE_TYPE,
        updatedAt: date.toISOString(),
        userId: '1',
      },
    ];

    const output = [
      {
        name: date.format(DATE_FULL_FORMAT),
        value: 2,
      },
    ];

    expect(getStatistics(input, date, date)).toEqual(output);
  });
});
