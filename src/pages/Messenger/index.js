import React from 'react';
import { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { io } from 'socket.io-client';

import { Button, Card, Col, Row, Typography } from 'antd';

import { getUserConversations } from 'redux/actions/conversationActions';
import { createMessage, getUserMessages } from 'redux/actions/messageAction';

import Conversation from 'pages/Messenger/components/Conversation';
import NewMessage from 'pages/Messenger/components/NewMessage';
import Message from 'pages/Messenger/components/Message';

import NoContent from 'components/NoContent';

import Friend from 'assets/img/messages.jpeg';

import 'pages/Messenger/messenger.scss';

const Messenger = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);
  const messages = useSelector((state) => state.message.messages);

  const conversations = useSelector(
    (state) => state.conversation.conversations,
  );

  const currentChatFromState = useSelector(
    (state) => state.conversation.currentChat,
  );

  const socket = useRef(io('ws://localhost:8900'));

  const scrollRef = useRef();

  const [currentUserChat, setCurrentUserChat] = useState(null);

  const [messageText, setMessageText] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const currentChat = currentChatFromState || currentUserChat;

  useEffect(() => {
    socket.current = io('ws://localhost:8900');

    socket.current.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, [socket]);

  useEffect(() => {
    socket.current.emit('addUser', profile.id);
  }, [profile.id]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.participants.includes(arrivalMessage.sender) &&
      dispatch(createMessage(arrivalMessage));
  }, [dispatch, arrivalMessage, currentChat]);

  useEffect(() => {
    dispatch(getUserConversations(profile.id));
  }, [dispatch, profile.id]);

  useEffect(() => {
    dispatch(getUserMessages(currentChat?.id));
  }, [dispatch, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView(0, { behavior: 'smooth' });
  }, [messages]);

  const onChange = (e) => {
    setMessageText(e.currentTarget.value);
  };

  const receiverId = currentChat?.participants?.find(
    (member) => member !== profile.id,
  );

  const onSubmit = () => {
    const onSuccess = () => {
      setMessageText('');
    };

    const message = {
      sender: profile.id,
      text: messageText,
      conversationId: currentChat?.id,
    };

    socket.current.emit('sendMessage', {
      senderId: profile.id,
      receiverId: receiverId,
      text: messageText,
    });

    dispatch(createMessage(message)).then(onSuccess);
  };

  return (
    <>
      {conversations.length > 0 ? (
        <>
          <Row>
            <Col span={6}>
              <Card bordered={false}>
                <Typography.Title level={5}>
                  Your current chats with friends:
                </Typography.Title>

                {conversations?.map((c) => (
                  <div onClick={() => setCurrentUserChat(c)}>
                    <Conversation conversation={c} />
                  </div>
                ))}
              </Card>
            </Col>

            <Col
              span={18}
              style={{
                maxHeight: '500px',
                overflowY: 'scroll',
                marginTop: 60,
              }}
            >
              {currentChat && (
                <div style={{ flexDirection: 'column' }} ref={scrollRef}>
                  {messages?.map((m) => (
                    <div>
                      <Message
                        own={m.sender === profile.id}
                        message={m}
                        key={m.id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </Col>
          </Row>

          {currentChat && (
            <Row>
              <Col span={6}></Col>

              <Col
                span={18}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '305px',
                  marginTop: '5%',
                }}
              >
                <Col span={16}>
                  <NewMessage
                    avatar={profile.avatar}
                    onChange={onChange}
                    messageText={messageText}
                  />
                </Col>
                <Col span={8}>
                  <Button
                    htmlType='submit'
                    onClick={onSubmit}
                    type='primary'
                    style={{
                      marginLeft: 10,
                      cursor: 'pointer',
                      width: '70%',
                      borderRadius: 'unset',
                    }}
                  >
                    Sent
                  </Button>
                </Col>
              </Col>
            </Row>
          )}
        </>
      ) : (
        <NoContent
          title="You don't have any conversations or messages"
          description='You should send message al least one your friend'
          img={Friend}
        />
      )}
    </>
  );
};

export default Messenger;
