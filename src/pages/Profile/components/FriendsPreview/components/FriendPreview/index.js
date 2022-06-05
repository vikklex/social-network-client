import React from 'react';
import { useState, useEffect } from 'react';

import { Avatar, Col, Row } from 'antd';

import ClientAPI from 'services/ClientAPI';

import NoAvatar from 'assets/img/noavatar.png';

const FriendPreview = ({ id, content }) => {
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const onSuccess = (resp) => {
      setUser(resp.data.user);
      setIsReady(true);
    };

    ClientAPI.getUser(id).then(onSuccess);
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Row>
      <Col>
        <Avatar src={user.avatar || NoAvatar} style={{ marginRight: '10px' }} />
      </Col>

      <Col>
        {!content && (
          <span style={{ whiteSpace: 'nowrap' }}>
            {user.first_name} {user.last_name}
          </span>
        )}
      </Col>
    </Row>
  );
};

export default FriendPreview;
