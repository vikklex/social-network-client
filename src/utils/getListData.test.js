import moment from 'moment';

import getListData from 'utils/getListData';

describe('Get list data', () => {
  it('Get warning meeting', () => {
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
        content: '123',
      },
    ];

    expect(getListData(date, input)).toEqual(output);
  });

  it('Get success meeting', () => {
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
        title: '12345',
        participants: ['1', '2', '3'],
        importance: 'success',
      },
    ];

    const output = [
      {
        type: 'success',
        content: '12345',
      },
    ];

    expect(getListData(date, input)).toEqual(output);
  });
});
