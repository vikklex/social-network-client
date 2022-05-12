import React from 'react';

import moment from 'moment';

import { Row } from 'antd';

import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const ReactionsLine = ({ startDate, endDate, reactions }) => {
  const getReactionsByDate = (date) => {
    return reactions.filter((reaction) => {
      return (
        moment(reaction.createdAt).format('YYYY-MM-DD') ===
        date.format('YYYY-MM-DD')
      );
    });
  };

  const getStatistics = () => {
    let result = [];

    for (
      let date = moment(startDate);
      date.isBefore(endDate);
      date.add(1, 'days')
    ) {
      const stat = getReactionsByDate(date);

      result.push({
        name: date.format('YYYY-MM-DD'),
        value: stat.length,
      });
    }

    return result;
  };

  return (
    <Row style={{ width: '100%', marginBottom: '5%' }}>
      <Row style={{ marginBottom: '5%' }}></Row>

      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={300} height={100} data={getStatistics()}>
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
