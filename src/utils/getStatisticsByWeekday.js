import moment from 'moment';

const getStatisticsByWeekday = (weekday, reactions) => {
  return reactions.reduce((result, reaction) => {
    if (moment(reaction.createdAt).format('dddd') === weekday) {
      return result + reaction.sum;
    }

    return result;
  }, 0);
};

export default getStatisticsByWeekday;
