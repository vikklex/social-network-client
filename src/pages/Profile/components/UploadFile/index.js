import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, message, Upload } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';

import {
  deleteAvatar,
  updateAvatar,
  getUserProfile,
} from 'redux/actions/profileActions';

import { getProfile } from 'redux/actions/authActions';

const UploadFile = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);
  const user = useSelector((state) => state.profile.user);

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile(user.id));
  }, [dispatch, user.id, user.avatar, profile.avatar]);

  const handleUpload = () => {
    const onSuccess = () => {
      message.success('You are successfully update avatar');

      dispatch(getUserProfile(user.id));
      dispatch(getProfile(user.id));
    };

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

    dispatch(updateAvatar({ user, formData, config })).then(onSuccess);

    setUploading(false);
    setFileList([]);
  };

  const onDeleteAvatar = () => {
    dispatch(deleteAvatar(user)).then(() => {
      dispatch(getUserProfile(user.id));
      dispatch(getProfile(user.id));
    });
  };

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>

      <Button
        icon={<DeleteOutlined />}
        style={{ width: '58%', marginTop: 10 }}
        onClick={onDeleteAvatar}
      >
        Delete
      </Button>

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
};

export default UploadFile;
