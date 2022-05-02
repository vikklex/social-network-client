import React from 'react';
import { Row } from 'antd';

import FriendsPreviewList from './components/List';

const FriendsPreview = ({ user, profile, id, style }) => {
  const mutualFriends = [];

  profile.followings.map((following) => {
    let friend = user.followings.filter((person) => person.id === following.id);
    mutualFriends.push(friend);
  });

  return (
    <>
      {user.followings.length !== 0 && (
        <>
          <Row style={{ marginTop: '15%' }}>
            <span className='personal_primary_key'>Friends: </span>
          </Row>
          <Row style={style}>
            <FriendsPreviewList users={user.followings} />
          </Row>
        </>
      )}

      {mutualFriends.length !== 0 && id && (
        <>
          <Row style={{ marginTop: '15%' }}>
            <span className='personal_primary_key'>Mutual friends: </span>
          </Row>
          <Row style={style}>
            <FriendsPreviewList users={mutualFriends.flat()} />
          </Row>
        </>
      )}

      {user.followers.length !== 0 && (
        <>
          <Row style={{ marginTop: '15%' }}>
            <span className='personal_primary_key'>Followers: </span>
          </Row>
          <Row style={style}>
            <FriendsPreviewList users={user.followers} />
          </Row>
        </>
      )}
    </>
  );
};

export default FriendsPreview;
