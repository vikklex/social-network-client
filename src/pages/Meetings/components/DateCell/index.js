import React from 'react';
import { Badge } from 'antd';

import getListData from 'utils/getListData';

const DateCell = ({ value, meetings, onSelect }) => {
  const listData = getListData(value, meetings);
  return (
    <ul
      className='events'
      onClick={() => onSelect(value)}
      style={{ height: '100%' }}
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
