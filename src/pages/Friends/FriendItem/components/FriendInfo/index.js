import React from 'react';
import { Col, Row } from 'antd';

import PropTypes from 'prop-types';

const FriendInfo = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <Row data-test='headline__component'>
      <Col style={{ marginTop: '10px', color: '#818c99' }}>
        <div data-test='status'> {user.status ?? ''}</div>
        <div data-test='city'> {user.city ?? ''}</div>
        <div data-test='relations'> {user.relations ?? ''}</div>
      </Col>
    </Row>
  );
};

FriendInfo.propTypes = {
  user: PropTypes.shape({
    status: PropTypes.string,
    city: PropTypes.string,
    relations: PropTypes.string,
  }),
};

export default FriendInfo;
