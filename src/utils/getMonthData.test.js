import moment from 'moment';

import { DATE_PM_FORMAT } from 'utils/Constants';

import getMonthData from 'utils/getMonthData';

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

      {
        id: '8',
        date: date.toISOString(),
        createdAt: date.toISOString(),
        startTime: date.toISOString(),
        endTime: date.toISOString(),
        updatedAt: date.toISOString(),
        userId: '1',
        title: '123',
        participants: ['1', '2', '3'],
        importance: 'success',
      },
    ];

    const output = [
      {
        type: 'warning',
        content: `123 (${date.format(DATE_PM_FORMAT)})`,
      },

      {
        type: 'success',
        content: `123 (${date.format(DATE_PM_FORMAT)})`,
      },
    ];

    expect(getMonthData(date, input)).toEqual(output);
  });
});
