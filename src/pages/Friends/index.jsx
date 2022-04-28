import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tabs } from 'antd';

import FriendsList from './FriendsList';

import { getUserProfile } from '../../redux/actions/authActions';

const { TabPane } = Tabs;

function Friends() {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    dispatch(getUserProfile({ id: profile.id }));
  }, [
    dispatch,
    profile.followers.length,
    profile.followings.length,
    profile.id,
  ]);

  return (
    <>
      <Tabs defaultActiveKey='1'>
        <TabPane tab='Friends' key='1'>
          <FriendsList persons={profile.followings} />
        </TabPane>
        <TabPane tab='Followers' key='2'>
          <FriendsList persons={profile.followers} />
        </TabPane>
      </Tabs>
    </>
  );
}

export default Friends;
