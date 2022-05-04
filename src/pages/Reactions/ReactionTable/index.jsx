import React from 'react';
import { Col, Row } from 'antd';

import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

import LikesPie from 'pages/Reactions/LikesPie';

function ReactionTable({ reaction, data, title, color }) {
  return (
    <Row gutter={24} style={{ marginTop: '5%' }}>
      <Col span={12}>
        <h1>{title}</h1>
        {reaction.map((value) => (
          <LikesPie
            userId={value.userId}
            likeNumber={value.sum}
            type={value.type}
            key={value.userId}
          />
        ))}
      </Col>
      <Col span={8}>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart width={800} height={800}>
            <Pie
              dataKey='value'
              isAnimationActive={false}
              animationDuration={3000}
              data={data}
              cx='50%'
              cy='50%'
              outerRadius={80}
              fill={color}
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Col>
    </Row>
  );
}

export default ReactionTable;
