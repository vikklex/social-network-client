import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../../../redux/actions/authActions';

import {
  Profile_Types,
  updateAvatar,
} from '../../../../redux/actions/profileActions';

const UploadFile = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);
  const user = useSelector((state) => state.profile.user);

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    const onSuccess = (status) => {
      if (status === Profile_Types.SUCCESS) {
        message.success('You are successfully update avatar');
        //console.log(dispatch(getUserProfile({ id: user.id })));
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

    dispatch(updateAvatar(auth, user, formData, config)).then(onSuccess);

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
  return (
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
};

export default UploadFile;
