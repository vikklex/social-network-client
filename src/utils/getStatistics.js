import moment from 'moment';

import getStatisticsByWeekday from './getStatisticsByWeekday';

export const getStatistics = (reactions) => {
  return moment.weekdays().map((weekday, index) => {
    return {
      name: weekday,
      value: getStatisticsByWeekday(weekday, reactions),
    };
  });
};
