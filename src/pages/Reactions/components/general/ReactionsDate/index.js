import { Row } from 'antd';
import React from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { getStatistics } from 'utils/getStatistics';

const ReactionsDate = ({ reactions, type, color }) => {
  return (
    <Row style={{ width: '45%', marginTop: '5%' }}>
      <h4 style={{ marginBottom: '10%' }}>{type}</h4>

      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={700}
          height={300}
          data={getStatistics(reactions)}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey='name'
            scale='point'
            padding={{ left: 10, right: 10 }}
          />

          <YAxis />

          <Tooltip />

          <CartesianGrid strokeDasharray='3 3' />

          <Bar dataKey='value' fill={color} background={{ fill: '#eee' }} />
        </BarChart>
      </ResponsiveContainer>
    </Row>
  );
};

export default ReactionsDate;
