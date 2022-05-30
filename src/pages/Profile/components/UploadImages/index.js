import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CheckOutlined, PaperClipOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

import { getUserProfile, updateAlbum } from 'redux/actions/profileActions';
import { getProfile } from 'redux/actions/authActions';

const UploadImages = ({ id, user }) => {
  const dispatch = useDispatch();
  const [fileList, setFileList] = useState([]);

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleUpload = () => {
    const onSuccess = () => {
      message.success('You are successfully update album');

      dispatch(getUserProfile(user.id));
      dispatch(getProfile(user.id));
    };
    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('album', file);
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    dispatch(updateAlbum({ user, formData, config })).then(onSuccess);
    setFileList([]);
  };

  return (
    <>
      {!id && (
        <Upload {...props}>
          <span className='personal__photos_upload'>
            <PaperClipOutlined />
            Add photos to album
          </span>
        </Upload>
      )}

      {fileList.length !== 0 && (
        <span
          className='personal__photos_upload'
          onClick={handleUpload}
          disabled={fileList.length === 0}
        >
          <CheckOutlined />
          Press to start upload
        </span>
      )}
    </>
  );
};

export default UploadImages;
