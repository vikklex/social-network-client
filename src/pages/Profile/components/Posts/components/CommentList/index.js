import React from 'react';

import { List } from 'antd';

import CommentList from '../CommentItem';

const PostComments = ({ comment, onDelete }) => {
  return (
    <List
      grid={{
        gutter: 8,
        xs: 1,
      }}
      itemLayout='horizontal'
      dataSource={comment}
      locale={{ emptyText: () => null }}
      renderItem={(data) => (
        <List.Item key={data.id} style={{ width: '100%', marginLeft: 40 }}>
          <CommentList comment={data} onDelete={onDelete} />
        </List.Item>
      )}
    />
  );
};

export default PostComments;
