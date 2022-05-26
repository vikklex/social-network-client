import { Popover } from 'antd';

import UploadFile from 'pages/Profile/components/UploadFile';

import NoAvatar from 'assets/img/noavatar.png';

// TODO: Rename to Avatar
const Avatar = ({ id, user }) => {
  const image = (
    <img
      src={user.avatar ? user.avatar : NoAvatar}
      alt='personal_avatar'
      className='profile__personal_avatar'
      style={{ borderRadius: 10 }}
    />
  );

  return (
    <>
      {!id && (
        <Popover
          placement='bottomLeft'
          content={<UploadFile />}
          title='Change Avatar'
        >
          {image}
        </Popover>
      )}

      {id && <div> {image}</div>}
    </>
  );
};

export default Avatar;
