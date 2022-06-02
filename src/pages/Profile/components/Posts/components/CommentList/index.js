import React from 'react';

import { List } from 'antd';

import CommentList from 'pages/Profile/components/Posts/components/CommentItem';

const PostComments = ({ comment, onDelete }) => {
  return (
    <List
      grid={{
        gutter: 8,
        xs: 1,
      }}
      itemLayout='horizontal'
      dataSource={comment}
      className='comment__list'
      locale={{ emptyText: () => null }}
      renderItem={(data) => (
        <List.Item
          key={data.id}
          style={{
            width: '55vw',
            marginLeft: 40,
          }}
        >
          <CommentList comment={data} onDelete={onDelete} />
        </List.Item>
      )}
    />
  );
};

export default PostComments;
