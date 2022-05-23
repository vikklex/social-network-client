import { Row } from 'antd';
import React from 'react';

import moment from 'moment';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ReactionsDate = ({ reactions, type, color }) => {
  const getStatisticsByWeekday = (weekday) => {
    return reactions.reduce((result, reaction) => {
      if (moment(reaction.createdAt).format('dddd') === weekday) {
        return result + reaction.sum;
      }

      return result;
    }, 0);
  };

  const getStatistics = () => {
    return moment.weekdays().map((weekday, index) => {
      return {
        name: weekday,
        value: getStatisticsByWeekday(weekday),
      };
    });
  };

  return (
    <Row style={{ width: '45%', marginTop: '5%' }}>
      <h4 style={{ marginBottom: '10%' }}>{type}</h4>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          width={700}
          height={300}
          data={getStatistics()}
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
