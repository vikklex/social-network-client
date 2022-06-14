import React from 'react';
import { Badge } from 'antd';

import moment from 'moment';

import getListData from 'utils/getListData';

import { DATE_FULL_FORMAT } from 'utils/Constants';

const DateCell = ({ value, meetings, onSelect }) => {
  const listData = getListData(value, meetings);

  return (
    <ul
      className='events'
      onClick={() => onSelect(value)}
      style={{ height: '100%' }}
      data-testid={moment(value).format(DATE_FULL_FORMAT)}
    >
      {listData.map((item, index) => (
        <li key={index}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
};

export default DateCell;
