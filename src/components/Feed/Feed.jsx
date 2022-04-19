import React from 'react';
import { useSelector } from 'react-redux';

import './feed.scss';
import Posts from '../Posts/Posts';

export default function Feed() {
  const userPosts = useSelector((state) => state.post);

  return (
    <div className='feed'>
      <div className='feed__wrapper'>
        {userPosts && !userPosts.loading ? <p>Loading....</p> : <Posts />}
      </div>
    </div>
  );
}
