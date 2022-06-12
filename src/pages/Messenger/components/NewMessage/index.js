import React from 'react';

import { Avatar, Col, Comment } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

import NoAvatar from 'assets/img/noavatar.png';

const NewMessage = ({ avatar, onChange, messageText }) => {
  return (
    <Col data-test='new-message'>
      <Comment
        avatar={<Avatar src={avatar || NoAvatar} alt='Avatar' />}
        content={
          <TextArea
            style={{ borderRadius: 20 }}
            placeholder='Write something'
            onChange={onChange}
            value={messageText}
          />
        }
      />
    </Col>
  );
};

export default NewMessage;
