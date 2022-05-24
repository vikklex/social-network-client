import moment from 'moment';

import getReactionsByDate from 'utils/getReactionsByDay';
import { DATE_FULL_FORMAT } from 'utils/Constants';

const getStatistics = (reactions, startDate, endDate) => {
  let result = [];

  for (
    let date = moment(startDate);
    date.isBefore(endDate);
    date.add(1, 'days')
  ) {
    const stat = getReactionsByDate(date, reactions);

    result.push({
      name: date.format(DATE_FULL_FORMAT),
      value: stat.length,
    });
  }

  console.log(result);
  return result;
};

export default getStatistics;
