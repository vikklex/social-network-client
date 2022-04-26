import React from 'react';

import { useSelector } from 'react-redux';

import { List } from 'antd';

import Post from '../Post';
import './posts.scss';

export default function Posts({ posts }) {
  //const posts = useSelector((state) => state.post.post);

  //const friendsPosts = useSelector((state) => state.friendPosts.friendPost);

  posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <List
      itemLayout='horizontal'
      dataSource={posts}
      locale={{ emptyText: () => null }}
      renderItem={(post) => (
        <List.Item key={post.id}>
          <Post post={post} />
        </List.Item>
      )}
    />
  );
}
