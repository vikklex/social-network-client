import moment from 'moment';
import { DATE_FULL_FORMAT } from 'utils/Constants';

const getListData = (date, meetings) => {
  const data = meetings?.filter(
    (meeting) =>
      date.format(DATE_FULL_FORMAT) ===
      moment(meeting.date).format(DATE_FULL_FORMAT),
  );

  return data.map((meeting) => {
    return {
      type: meeting.importance,
      content: meeting.title,
    };
  });
};

export default getListData;
