import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, message } from 'antd';

import {
  addFriend,
  deleteFriend,
  blockUser,
} from 'redux/actions/profileActions';

const AddFriend = ({ user }) => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);

  const [friend, setFriend] = useState(false);

  useEffect(() => {
    if (profile.followings.find((follow) => follow === user.id)) {
      setFriend(true);
    } else {
      setFriend(false);
    }
  }, [profile.followings, user.id]);

  const handleAddFriend = () => {
    setFriend(true);
    dispatch(addFriend({ profile, user }));
  };

  const handleDeleteFriend = () => {
    setFriend(false);
    dispatch(deleteFriend({ profile, user }));
  };

  const handleBlockUser = () => {
    dispatch(blockUser({ profile, user }));

    !user.is_blocked
      ? message.success(
          "You have blocked the user and now he won't be able to post",
        )
      : message.success('You have unblocked the user ');
  };

  return (
    <>
      {!friend ? (
        <Button type='primary' size='large' onClick={handleAddFriend}>
          Add to friends
        </Button>
      ) : (
        <Button type='primary' size='large' onClick={handleDeleteFriend}>
          Delete from friends
        </Button>
      )}

      {profile.is_admin && (
        <>
          {!user.is_blocked ? (
            <Button
              danger
              size='large'
              onClick={handleBlockUser}
              style={{ marginTop: 10 }}
            >
              Block user
            </Button>
          ) : (
            <Button
              danger
              size='large'
              style={{ marginTop: 10 }}
              onClick={handleBlockUser}
            >
              Unblock user
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default AddFriend;
