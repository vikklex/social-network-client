import React from 'react';

import { Col } from 'antd';

const UserNumbers = ({ user, posts }) => {
  return (
    <>
      <Col span={6}>
        <div className='personal__numbers_number'>
          {user.followings?.length ? user.followings.length : 0}
        </div>
        <div className='personal__numbers_following'>
          {user.followings?.length < 2 ? 'Friend' : 'Friends'}
        </div>
      </Col>

      <Col span={6}>
        <div className='personal__numbers_number'>
          {user.followers?.length ? user.followers.length : 0}
        </div>
        <div className='personal__numbers_followers'>
          {user.followers?.length < 2 ? 'Follower' : 'Followers'}
        </div>
      </Col>

      <Col span={6}>
        <div className='personal__numbers_number'>{posts?.length}</div>
        <div className='personal__numbers_posts'>Posts</div>
      </Col>
    </>
  );
};

export default UserNumbers;
