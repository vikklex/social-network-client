import React from 'react';

import { Row } from 'antd';

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import getStatisticsByDate from 'utils/getStatisticsByDate';

const UserStatistics = ({ startDate, endDate, users }) => {
  return (
    <Row style={{ width: '100%', marginBottom: '5%' }}>
      <Row style={{ marginBottom: '5%' }}></Row>

      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart
          width={300}
          height={100}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          data={getStatisticsByDate(users, startDate, endDate)}
        >
          <CartesianGrid strokeDasharray='3 3' />

          <Area
            type='monotone'
            dataKey='value'
            stroke='#8884d8'
            fill='#8884d8'
          />

          <XAxis
            dataKey='name'
            scale='point'
            padding={{ left: 10, right: 10 }}
          />

          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </Row>
  );
};

export default UserStatistics;
