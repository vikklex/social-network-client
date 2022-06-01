import moment from 'moment';

import { getUsersWithComplitedProfile } from 'utils/getUsersWithComplitedProfile';

describe('Get percent users with compiled profile', () => {
  it('Get 100 percent', () => {
    const date = moment();

    const input = [
      {
        id: '1',
        desc: 'hello',
        city: 'Minsk',
        gender: 'Male',
        job: 'wizard',
        from: 'Minsk',
        birthday: date.toISOString(),
      },

      {
        id: '2',
        desc: 'hello',
        city: 'Minsk',
        gender: 'Male',
        job: 'wizard',
        from: 'Minsk',
        birthday: date.toISOString(),
      },
    ];

    const output = '100.0';
    expect(getUsersWithComplitedProfile(input)).toEqual(output);
  });

  it('Get 50 percent', () => {
    const date = moment();

    const input = [
      {
        id: '1',
        desc: 'hello',
        city: 'Minsk',
        gender: 'Male',
        job: 'wizard',
        from: 'Minsk',
        birthday: date.toISOString(),
      },

      {
        id: '2',
        desc: '',
        city: '',
        gender: 'Male',
        job: 'wizard',
        from: 'Minsk',
        birthday: date.toISOString(),
      },
    ];

    const output = '50.0';
    expect(getUsersWithComplitedProfile(input)).toEqual(output);
  });
});
