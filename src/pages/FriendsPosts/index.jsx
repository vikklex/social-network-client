import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsPosts } from '../../redux/actions/friendPostsAction';

import Posts from '../Profile/components/Posts';

const FriendsPosts = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile.user);

  useEffect(() => {
    if (user) {
      dispatch(getFriendsPosts(user.id));
    }
  }, [user, dispatch]);

  const posts = useSelector((state) => state.friendPosts.friendPost);
  return (
    <>
      <Posts posts={posts} />
    </>
  );
};

export default FriendsPosts;
