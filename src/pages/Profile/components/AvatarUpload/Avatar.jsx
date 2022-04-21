import { UploadOutlined } from '@ant-design/icons';
import { Button, Popover, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAvatar } from '../../../../redux/actions/profileActions';

import NoAvatar from './../../../../assets/img/noavatar.png';

const Avatar = ({ auth, user }) => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('avatar', file);
    });
    setUploading(true);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    dispatch(updateAvatar(auth, formData, config));
    setUploading(false);
    setFileList([]);
  };

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const content = (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
      <Button
        type='primary'
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </>
  );
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
