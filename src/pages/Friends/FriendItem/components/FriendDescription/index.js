import React from 'react';

import { Avatar, Col, Row } from 'antd';

import PropTypes from 'prop-types';

import NoAvatar from 'assets/img/noavatar.png';

const FriendDescription = ({ user }) => {
  return (
    <>
      <Row data-test='friend__description'>
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
    </>
  );
};

FriendDescription.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
  }),
};

export default FriendDescription;
