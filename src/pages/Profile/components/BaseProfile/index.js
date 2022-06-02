import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Marquee from 'react-fast-marquee';

import jwt_decode from 'jwt-decode';

import { Col, Row, Divider, Tag, Alert } from 'antd';

import { getUserProfile } from 'redux/actions/profileActions';
import { getPosts } from 'redux/actions/postActions';

import Spinner from 'components/Spinner';

import Feed from 'pages/Profile/components/Feed';
import NewPost from 'pages/Profile/components/NewPost';
import Album from 'pages/Profile/components/Album';
import ModalArea from 'pages/Profile/Modal';
import Avatar from 'pages/Profile/components/AvatarUpload';
import Status from 'pages/Profile/components/Status';
import UserInfo from 'pages/Profile/components/UserInfo';
import UserNumbers from 'pages/Profile/components/UserNumbers';
import FriendsPreview from 'pages/Profile/components/FriendsPreview';

import 'pages/Profile/profile.scss';

const BaseProfile = ({ id, UserButton, UploadImages }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const profile = useSelector((state) => state.auth.profile);
  const user = useSelector((state) => state.profile.user);
  const posts = useSelector((state) => state.post.post);

  const person = id ? user : profile;

  const [statusText, setStatusText] = useState(person?.status);

  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    if (id) {
      const onSuccess = () => {
        setStatusText('');
      };

      dispatch(getUserProfile(id)).then(onSuccess);
    } else {
      dispatch(getUserProfile(jwt_decode(token).id));
    }
  }, [dispatch, id, token, statusText]);

  useEffect(() => {
    if (user) {
      dispatch(getPosts(user.id));
    }
  }, [user, dispatch]);

  if (!user) {
    return null;
  }

  return (
    <Spinner spinning={isLoading}>
      {user.is_blocked && !id && (
        <Alert
          banner
          type='info'
          message={
            <Marquee pauseOnHover gradient={false}>
              {`${user.first_name} ${user.last_name} have been blocked by an administrator for violating community
              rights and now you cannot post until you are unblocked. You can
              contact community administrator about unlocking. Contacts are sent
              to your email.`}
            </Marquee>
          }
        />
      )}

      <Row justify='center' style={{ marginTop: '3%' }}>
        <Col span={6}>
          <Avatar id={id} user={user} />
          <UserButton id={id} user={user} />
          {(user.friends_visibility || !id) && (
            <FriendsPreview
              id={id}
              style={{
                minHeight: '5%',
                maxHeight: '19%',
                overflow: 'scroll',
              }}
            />
          )}
        </Col>

        <Col span={16} offset={1}>
          <Row>
            <Col span={20} className='username'>
              {`${user.first_name} ${user.last_name}`}
            </Col>

            <Col span={2} className='status'>
              {user.is_admin ? (
                <Tag color='blue'>admin</Tag>
              ) : (
                <Tag color='green'>online</Tag>
              )}
            </Col>
          </Row>

          <Row className='status-desc'>
            <Status
              id={id}
              user={user}
              statusText={statusText}
              setStatusText={setStatusText}
            />
          </Row>

          <Row>
            <UserInfo user={user} />
          </Row>

          <Divider />

          <Row justify='space-around' className='personal__numbers'>
            <UserNumbers user={user} posts={posts} />
          </Row>

          {(user.album_visibility || !id) && (
            <>
              <Row justify='space-between' style={{ marginBottom: 30 }}>
                {user.album.length !== 0 && (
                  <div className='site-card-border-less-wrapper profile'>
                    <Col className='personal_primary_key'>
                      {`${user.first_name}'s photos (${user.album.length}
                       photo)`}
                    </Col>

                    <Col>
                      <span
                        onClick={() => setVisibleModal(true)}
                        className='personal__album_href'
                      >
                        See all photos
                      </span>
                    </Col>
                  </div>
                )}
              </Row>

              <ModalArea
                visibleModal={visibleModal}
                setVisibleModal={setVisibleModal}
                images={user.album}
                username={user.first_name}
              />

              {user.album.length !== 0 && (
                <span style={{ marginLeft: 25 }}>
                  <Album images={user.album} />
                </span>
              )}

              <Row>
                <Col>
                  <UploadImages id={id} user={user} />
                </Col>
              </Row>
            </>
          )}

          {!id && !user.is_blocked && <NewPost />}
        </Col>
      </Row>

      {(user.posts_visibility || !id) && (
        <Row style={{ backgroundColor: 'white' }}>
          <Col span={24}>
            <Feed />
          </Col>
        </Row>
      )}
    </Spinner>
  );
};

export default BaseProfile;
