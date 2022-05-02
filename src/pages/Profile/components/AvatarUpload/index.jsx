import { Popover } from 'antd';

import UploadFile from 'pages/Profile/components/UploadFile';

import NoAvatar from 'assets/img/noavatar.png';

const Avatar = ({ id, user }) => {
  const content = <UploadFile />;

  const image = (
    <img
      src={user.avatar ? user.avatar : NoAvatar}
      alt='personal_avatar'
      className='profile__personal_avatar'
    />
  );

  return (
    <>
      {!id && (
        <Popover placement='bottomLeft' content={content} title='Change Avatar'>
          {image}
        </Popover>
      )}
      {id && <div> {image}</div>}
    </>
  );
};

export default Avatar;
