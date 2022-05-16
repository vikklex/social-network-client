import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, message, Upload } from 'antd';
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';

import { getAuthUserProfile } from 'redux/actions/authActions';
import {
  Profile_Types,
  updateAvatar,
  getUserProfile,
} from 'redux/actions/profileActions';
import { deleteAvatar } from 'redux/actions/profileActions';

const UploadFile = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);
  const user = useSelector((state) => state.profile.user);

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    dispatch(getAuthUserProfile({ id: user.id }));
  }, [dispatch, user.id, user.avatar]);

  const handleUpload = () => {
    const onSuccess = (status) => {
      if (status === Profile_Types.SUCCESS) {
        message.success('You are successfully update avatar');
        dispatch(getUserProfile({ id: user.id }));
      }
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

    dispatch(updateAvatar(profile, user, formData, config)).then(onSuccess);

    setUploading(false);
    setFileList([]);
  };

  const onDeleteAvatar = () => {
    dispatch(deleteAvatar(user)).then(() => {
      dispatch(getUserProfile({ id: user.id }));
      dispatch(getAuthUserProfile({ id: user.id }));
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
