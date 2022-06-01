import moment from 'moment';

import { getStatistics } from 'utils/getStatistics';
import getStatisticsByWeekday from 'utils/getStatisticsByWeekday';

const LIKE_TYPE = 'like';

describe('Get statistics', () => {
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
    ];

    const output = moment.weekdays().map((weekday, index) => {
      return {
        name: weekday,
        value: getStatisticsByWeekday(weekday, input),
      };
    });

    expect(getStatistics(input)).toEqual(output);
  });
});
