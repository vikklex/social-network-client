import React from 'react';
import { useSelector } from 'react-redux';

import './feed.scss';
import Posts from '../Posts';

export default function Feed() {
  const userPosts = useSelector((state) => state.post);

  const posts = useSelector((state) => state.post.post);

  return (
    <div className='feed'>
      <div className='feed__wrapper'>
        {userPosts && !userPosts.loading ? (
          <p>Loading....</p>
        ) : (
          <Posts posts={posts} />
        )}
      </div>
    </div>
  );
}
