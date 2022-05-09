import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Tabs } from 'antd';

import { getUserProfile } from 'redux/actions/authActions';

import NoContent from 'components/NoContent';
import FriendsList from 'pages/Friends/FriendsList';

import Friend from 'assets/img/friendsgroup.jpg';

const { TabPane } = Tabs;

const Friends = () => {
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
      {!profile.followings.length && !profile.followers.length ? (
        <NoContent
          title="You don't have friends or followers"
          description='You should add some user to friends list or follow to at least one user'
          img={Friend}
        />
      ) : (
        <Tabs defaultActiveKey='1'>
          <TabPane tab='Friends' key='1'>
            <FriendsList persons={profile.followings} />
          </TabPane>
          <TabPane tab='Followers' key='2'>
            <FriendsList persons={profile.followers} />
          </TabPane>
        </Tabs>
      )}
    </>
  );
};

export default Friends;
