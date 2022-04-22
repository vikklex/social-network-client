import { Popover } from 'antd';
import UploadFile from '../UploadFile/UploadFile';

import NoAvatar from './../../../../assets/img/noavatar.png';

const Avatar = ({ user }) => {
  
  const content = <UploadFile />;
  return (
    <>
      <Popover placement='bottomLeft' content={content} title='Change Avatar'>
        <img
          src={user.avatar ? user.avatar : NoAvatar}
          alt='personal_avatar'
          className='profile__personal_avatar'
        />
      </Popover>
    </>
  );
};

export default Avatar;
