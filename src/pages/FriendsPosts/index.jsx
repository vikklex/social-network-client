import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsPosts } from 'redux/actions/friendPostsAction';

import Posts from 'pages/Profile/components/Posts';

const FriendsPosts = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.profile);
  const posts = useSelector((state) => state.friendPosts.friendPost);

  useEffect(() => {
    if (user) {
      dispatch(getFriendsPosts(user.id));
    }
  }, [user, dispatch, posts.length]);

  return <Posts posts={posts} isUserProfile={false} />;
};

export default FriendsPosts;
