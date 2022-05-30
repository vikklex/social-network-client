import React from 'react';
import { useSelector } from 'react-redux';

import Posts from 'pages/Profile/components/Posts';

import './feed.scss';

export const Feed = () => {
  const posts = useSelector((state) => state.post.post);

  return (
    <div className='feed'>
      <div className='feed__wrapper'>
        <Posts posts={posts} isUserProfile={true} />
      </div>
    </div>
  );
};

export default Feed;
