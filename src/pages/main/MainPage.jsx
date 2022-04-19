import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Profile from '../Profile/Profile';
import { getUserProfile } from '../../redux/actions/profileActions';

export default function MainPage() {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState([]);
  const { id } = useParams();

  const { auth, profile } = useSelector((state) => state);

  const authUser_condition = auth && auth.user && id === auth.user._id;

  useEffect(() => {
    if (authUser_condition) {
      setUserData([auth.user]);
    } else {
      dispatch(getUserProfile({ users: profile.users, id, auth }));
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [authUser_condition, id, profile.users, auth, auth.user, dispatch]);

  return (
    <Profile
      data={userData.length === 0 ? auth.user : userData.map((user) => user)}
    ></Profile>
  );
}
