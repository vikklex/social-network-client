import React from 'react';

import { useState } from 'react';
import { useEffect } from 'react';

import { Avatar, Row, Col } from 'antd';

import ClientAPI from 'services/ClientAPI';

import NoAvatar from 'assets/img/noavatar.png';

const FriendItem = ({ id }) => {
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
    <>
      <Row>
        <Col>
          <Avatar
            src={user.avatar || NoAvatar}
            style={{ marginRight: '10px' }}
          />
        </Col>

        <Col style={{ alignItems: 'center' }}>
          <span style={{ whiteSpace: 'nowrap' }}>
            {user.first_name} {user.last_name}
          </span>
        </Col>
      </Row>

      <Row>
        <Col style={{ marginTop: '10px', color: '#818c99' }}>
          <div> {user.status ?? ''}</div>
          <div> {user.city ?? ''}</div>
          <div> {user.relations ?? ''}</div>
        </Col>
      </Row>
    </>
  );
};

export default FriendItem;
