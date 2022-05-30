import React from 'react';
import { Badge } from 'antd';

import getMonthData from 'utils/getMonthData';

const MonthCell = ({ value, meetings }) => {
  const listData = getMonthData(value, meetings);
  return (
    <ul className='events' style={{ height: '100%' }}>
      {listData.map((item, index) => (
        <li key={index}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
};

export default MonthCell;
