import getStatisticsByWeekday from 'utils/getStatisticsByWeekday';

describe('Statistics', () => {
  it('Get statistics by weekday', () => {
    const input = {
      weekday: 'Thursday',
      reactions: [
        {
          createdAt: '2022-05-26T16:17:30.771Z',
          gender: 'male',
          sum: 1,
          type: 'like',
          userId: '628fa77e3bd66946b5695495',
          userName: 'user user',
        },
      ],
    };

    const output = 1;

    expect(getStatisticsByWeekday(input.weekday, input.reactions)).toEqual(
      output,
    );
  });
});
