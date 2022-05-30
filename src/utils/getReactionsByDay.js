import moment from 'moment';

import { DATE_FULL_FORMAT } from './Constants';

// TODO: Rename to day
const getReactionsByDate = (date, reactions) => {
  return reactions?.filter((reaction) => {
    return (
      moment(reaction.createdAt).format(DATE_FULL_FORMAT) ===
      date.format(DATE_FULL_FORMAT)
    );
  });
};

export default getReactionsByDate;
