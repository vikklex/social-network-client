import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { Button } from 'antd';

import { createUserConversation } from 'redux/actions/conversationActions';

const SendMessage = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);

  const handleClick = () => {
    const onSuccess = () => {
      navigate('/messenger');
    };
    const data = {
      senderId: profile.id,
      receiverId: id,
    };
    dispatch(createUserConversation(data)).then(onSuccess);
  };

  return (
    <Button
      type='primary'
      size='large'
      onClick={handleClick}
      style={{ marginTop: 10, backgroundColor: 'silver', border: 'none' }}
    >
      Send message
    </Button>
  );
};

export default SendMessage;
