import { Image, List } from 'antd';
import React from 'react';

const Album = ({ images }) => {
  return (
    <List
      grid={{
        gutter: 8,
        xs: 1,
      }}
      itemLayout='horizontal'
      dataSource={images}
      locale={{ emptyText: () => null }}
      renderItem={(image) => (
        <List.Item key={image}>
          <Image width={120} padding={40} src={image} />
        </List.Item>
      )}
    />
  );
};

export default Album;
