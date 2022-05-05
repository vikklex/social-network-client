import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriendsPosts } from 'redux/actions/friendPostsAction';

import NoContent from 'components/NoContent';
import Posts from 'pages/Profile/components/Posts';

import Friends from 'assets/img/friend4.svg';

const FriendsPosts = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.profile);

  const posts = useSelector((state) => state.friendPosts.friendPost);

  useEffect(() => {
    if (user) {
      dispatch(getFriendsPosts(user.id));
    }
  }, [user, dispatch, posts.length]);

  return (
    <>
      {!posts.length ? (
        <NoContent
          title="You don't have friends who have posts"
          description='Add some user who has posts to a friend list'
          img={Friends}
        />
      ) : (
        <Posts posts={posts} isUserProfile={false} />
      )}
    </>
  );
};

export default FriendsPosts;
