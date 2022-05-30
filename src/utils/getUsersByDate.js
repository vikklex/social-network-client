import moment from 'moment';

import { DATE_FULL_FORMAT } from './Constants';

const getUsersByDate = (date, users) => {
  return users?.filter((user) => {
    return (
      moment(user.createdAt).format(DATE_FULL_FORMAT) ===
      date.format(DATE_FULL_FORMAT)
    );
  });
};

export default getUsersByDate;
