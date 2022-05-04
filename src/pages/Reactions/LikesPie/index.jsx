import { Avatar, Row } from 'antd';
import React, { useEffect, useState } from 'react';

import ClientAPI from 'services/ClientAPI';

const LikesPie = ({ userId, likeNumber, type }) => {
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
      <Avatar src={user.avatar} style={{ marginRight: '4%' }} />
      {`${user.first_name} ${user.last_name} ${type} your post ${likeNumber} count`}
    </Row>
  );
};

export default LikesPie;
