import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, Row } from 'antd';

import ClientAPI from 'services/ClientAPI';

import NoAvatar from 'assets/img/noavatar.png';

const LikeList = ({ userId, likeNumber, type }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    ClientAPI.getUser(userId).then((resp) => {
      setUser(resp.data.user);
    });
  }, [userId]);

  if (!user) {
    return null;
  }
  return (
    <Row style={{ display: 'flex', marginBottom: '2%' }}>
      <Avatar
        src={user.avatar || NoAvatar}
        style={{ marginRight: '4%', cursor: 'pointer' }}
        onClick={() => navigate(`/user/${user.id}`)}
      />

      {`${user.first_name} ${user.last_name} ${type} your post ${likeNumber} count`}
    </Row>
  );
};

export default LikeList;
