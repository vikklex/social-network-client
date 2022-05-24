import { useParams } from 'react-router-dom';

import BaseProfile from 'pages/Profile/components/BaseProfile';
import AddFriend from 'pages/Profile/components/AddFriend';
import EditButton from 'pages/Profile/components/EditButton';
import UploadImages from 'pages/Profile/components/UploadImages';

import 'pages/Profile/profile.scss';

const Profile = () => {
  const { id } = useParams();

  return (
    <BaseProfile
      id={id}
      UserButton={id ? AddFriend : EditButton}
      UploadImages={UploadImages}
    />
  );
};

export default Profile;
