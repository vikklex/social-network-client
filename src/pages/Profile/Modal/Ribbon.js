import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Badge, Button, Image } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { deleteImageFromAlbum } from 'redux/actions/profileActions';
import { getAuthUserProfile } from '../../../redux/actions/authActions';

const Ribbon = ({ src }) => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);

  const handleDelete = () => {
    dispatch(deleteImageFromAlbum({ profile, src }));
  };

  return (
    <Badge.Ribbon
      text={
        <Button
          type='text'
          danger
          size='small'
          icon={<DeleteOutlined />}
          onClick={() => handleDelete()}
        ></Button>
      }
      color='white'
      style={{ position: 'absolute', top: '-19px', cursor: 'pointer' }}
    >
      <Image width={228} padding={20} src={src} />
    </Badge.Ribbon>
  );
};

export default Ribbon;
