import { Image, List } from 'antd';
import React from 'react';

const Album = ({ images }) => {
  return (
    <List
      grid={{
        gutter: 8,
        xs: 1,
      }}
      style={{ maxHeight: '135px', overflow: 'hidden' }}
      itemLayout='horizontal'
      dataSource={images}
      locale={{ emptyText: () => null }}
      renderItem={(image) => (
        <List.Item key={image}>
          <Image
            src={image}
            height={120}
            style={{ borderRadius: 10, objectFit: 'cover' }}
          />
        </List.Item>
      )}
    />
  );
};

export default Album;
