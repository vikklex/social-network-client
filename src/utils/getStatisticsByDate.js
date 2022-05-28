import moment from 'moment';

import getReactionsByDate from './getReactionsByDay';

import { DATE_FULL_FORMAT } from './Constants';

const getStatisticsByDate = (reactions, startDate, endDate) => {
  let result = [];

  for (
    let date = moment(startDate);
    date.isSameOrBefore(endDate);
    date.add(1, 'days')
  ) {
    const stat = getReactionsByDate(date, reactions);

    result.push({
      name: date.format(DATE_FULL_FORMAT),
      value: stat.length,
    });
  }

  return result;
};

export default getStatisticsByDate;
