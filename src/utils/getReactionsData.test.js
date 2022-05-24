import moment from 'moment';

import getReactionsData from './getReactionsData';

const LIKE_TYPE = 'like';
const DISLIKE_TYPE = 'dislike';

const MALE_GENDER_TYPE = 'Male';

describe('Reactions', () => {
  it('Get reactions data (like)', () => {
    const date = moment().toISOString();

    const input = [
      {
        userId: '1',
        type: LIKE_TYPE,
        first_name: 'Slava',
        last_name: 'Bobik',
        gender: MALE_GENDER_TYPE,
        createdAt: date,
      },
      {
        userId: '2',
        type: LIKE_TYPE,
        first_name: 'Bob',
        last_name: 'Jober',
        gender: MALE_GENDER_TYPE,
        createdAt: date,
      },
    ];

    const output = [
      {
        userId: '1',
        sum: 1,
        type: LIKE_TYPE,
        userName: 'Slava Bobik',
        gender: 'Male',
        createdAt: date,
      },
      {
        userId: '2',
        sum: 1,
        type: LIKE_TYPE,
        userName: 'Bob Jober',
        gender: 'Male',
        createdAt: date,
      },
    ];

    expect(getReactionsData(input, LIKE_TYPE)).toEqual(output);
  });

  it('Get reactions data (dislike)', () => {
    const date = moment().toISOString();

    const input = [
      {
        userId: '1',
        type: DISLIKE_TYPE,
        first_name: 'Slava',
        last_name: 'Bobik',
        gender: MALE_GENDER_TYPE,
        createdAt: date,
      },

      {
        userId: '2',
        type: DISLIKE_TYPE,
        first_name: 'Bob',
        last_name: 'Jober',
        gender: MALE_GENDER_TYPE,
        createdAt: date,
      },
    ];

    const output = [
      {
        userId: '1',
        sum: 1,
        type: DISLIKE_TYPE,
        userName: 'Slava Bobik',
        gender: 'Male',
        createdAt: date,
      },
      {
        userId: '2',
        sum: 1,
        type: DISLIKE_TYPE,
        userName: 'Bob Jober',
        gender: 'Male',
        createdAt: date,
      },
    ];

    expect(getReactionsData(input, DISLIKE_TYPE)).toEqual(output);
  });
});
