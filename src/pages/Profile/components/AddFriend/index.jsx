import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import {
  addFriend,
  deleteFriend,
} from '../../../../redux/actions/profileActions';

function AddFriend({ user }) {
  const profile = useSelector((state) => state.auth.profile); // auth user

  const dispatch = useDispatch();
  const [friend, setFriend] = useState(false);

  const following = profile.followings.find((follow) => follow.id === user.id);

  useEffect(() => {
    if (profile.followings.find((follow) => follow.id === user.id)) {
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

  return (
    <>
      {!friend && (
        <Button type='primary' size='large' onClick={handleAddFriend}>
          Add to friends
        </Button>
      )}
      {friend && (
        <Button type='primary' size='large' onClick={handleDeleteFriend}>
          Delete from friends
        </Button>
      )}
    </>
  );
}

export default AddFriend;
