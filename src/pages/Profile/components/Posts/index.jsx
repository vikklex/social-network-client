import React from 'react';

import { List } from 'antd';

import Post from '../Post';
import './posts.scss';

export default function Posts({ posts, isUserProfile }) {
  return (
    <List
      itemLayout='horizontal'
      dataSource={posts}
      locale={{ emptyText: () => null }}
      renderItem={(post) => (
        <List.Item key={post.id}>
          <Post post={post} isUserProfile={isUserProfile} />
        </List.Item>
      )}
    />
  );
}
