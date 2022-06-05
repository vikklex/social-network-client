import React from 'react';

import { Col, Row } from 'antd';

import moment from 'moment';

import FriendPreview from 'pages/Profile/components/FriendsPreview/components/FriendPreview';

const Message = ({ own, message }) => {
  return (
    <Row className={own ? 'left' : ''} style={{ marginTop: 10 }}>
      <Col span={2}>
        <FriendPreview id={message.sender} content='message' />
      </Col>

      <Col span={22}>
        <Row>
          <Col span={18} className={own ? 'own' : 'friend'}>
            {message.text}

            <span className='message-time'>
              {moment(message.createdAt).calendar()}
            </span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Message;
