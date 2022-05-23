import React from 'react';

import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const ReactionsGender = ({ data, color, type }) => {
  console.log(data);
  return (
    <>
      <h4>{type}</h4>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart width={600} height={600}>
          <Pie
            dataKey='value'
            isAnimationActive={true}
            animationDuration={3000}
            data={data}
            cx='50%'
            cy='50%'
            innerRadius={50}
            outerRadius={80}
            fill={color}
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default ReactionsGender;
