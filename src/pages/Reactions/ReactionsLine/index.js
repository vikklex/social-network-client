import React from 'react';

import { Row } from 'antd';

import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import getStatisticsByDate from 'utils/getStatisticsByDate';

const ReactionsLine = ({ startDate, endDate, reactions }) => {
  return (
    <Row style={{ width: '100%', marginBottom: '5%' }}>
      <Row style={{ marginBottom: '5%' }}></Row>

      <ResponsiveContainer width='100%' height='100%'>
        <LineChart
          width={300}
          height={100}
          data={getStatisticsByDate(reactions, startDate, endDate)}
        >
          <Line
            type='monotone'
            dataKey='value'
            stroke='#8884d8'
            strokeWidth={2}
          />
          <XAxis
            dataKey='name'
            scale='point'
            padding={{ left: 10, right: 10 }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Row>
  );
};

export default ReactionsLine;
