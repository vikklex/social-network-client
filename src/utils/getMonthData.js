import moment from 'moment';
import { MONTH_MOMENT_FORMAT, DATE_PM_FORMAT } from 'utils/Constants';

const getMonthData = (value, meetings) => {
  const data = meetings?.filter(
    (meeting) =>
      value.format(MONTH_MOMENT_FORMAT) ===
      moment(meeting.date).format(MONTH_MOMENT_FORMAT),
  );

  return data.map((meeting) => {
    return {
      type: meeting.importance,
      content: `${meeting.title} (${moment(meeting.date).format(
        DATE_PM_FORMAT,
      )})`,
    };
  });
};

export default getMonthData;
