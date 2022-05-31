import moment from 'moment';

import getMonthData from './getMonthData';

describe('Get month data', () => {
  it('Get warning content', () => {
    const date = moment();

    const input = [
      {
        id: '7',
        date: date.toISOString(),
        createdAt: date.toISOString(),
        startTime: date.toISOString(),
        endTime: date.toISOString(),
        updatedAt: date.toISOString(),
        userId: '1',
        title: '123',
        participants: ['1', '2', '3'],
        importance: 'warning',
      },
    ];

    const output = [
      {
        type: 'warning',
        content: '123 (May 31, 2022)',
      },
    ];

    expect(getMonthData(date, input)).toEqual(output);
  });
});
