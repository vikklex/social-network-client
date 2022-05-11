import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

import { Row, DatePicker, Space, Col } from 'antd';

const { RangePicker } = DatePicker;

const ReactionsLine = () => {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return (
    <Row style={{ width: '100%', marginBottom: '5%' }}>
      <Row style={{ marginBottom: '5%' }}>
        <Col span={12} style={{ marginTop: '1%' }}>
          Select date to show reaction statistics
        </Col>
        <Col span={12}>
          <Space direction='vertical' size={12}>
            <RangePicker />
          </Space>
        </Col>
      </Row>

      <ResponsiveContainer width='100%' height='100%'>
        <LineChart width={300} height={100} data={data}>
          <Line type='monotone' dataKey='pv' stroke='#8884d8' strokeWidth={2} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </Row>
  );
};

export default ReactionsLine;
