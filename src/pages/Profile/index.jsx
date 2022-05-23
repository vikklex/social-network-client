import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Col, Row, Divider } from 'antd';

import jwt_decode from 'jwt-decode';

import { getPosts } from 'redux/actions/postActions';
import { getUserProfile } from 'redux/actions/profileActions';

import Spinner from 'components/Spinner';

import Feed from 'pages/Profile/components/Feed';
import NewPost from 'pages/Profile/components/NewPost';
import Album from 'pages/Profile/components/Album';
import ModalArea from 'pages/Profile/Modal';
import Avatar from 'pages/Profile/components/AvatarUpload';
import AddFriend from 'pages/Profile/components/AddFriend';
import Status from 'pages/Profile/components/Status';
import UserInfo from 'pages/Profile/components/UserInfo';
import UserNumbers from 'pages/Profile/components/UserNumbers';
import FriendsPreview from 'pages/Profile/components/FriendsPreview';
import EditButton from 'pages/Profile/components/EditButton';
import UploadImages from 'pages/Profile/components/UploadImages';

import 'pages/Profile/profile.scss';

const BaseProfile = ({ id, UserButton, UploadImages }) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.profile.user);
  const profile = useSelector((state) => state.auth.profile);
  const posts = useSelector((state) => state.post.post);

  const person = id ? user : profile;

  const [statusText, setStatusText] = useState(person?.status);

  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    if (id) {
      const onSuccess = () => {
        setStatusText('');
      };
      dispatch(getUserProfile({ id: id })).then(onSuccess);
    } else {
      dispatch(getUserProfile({ id: jwt_decode(token).id }));
    }
  }, [dispatch, id, token, statusText]);

  useEffect(() => {
    if (user) {
      dispatch(getPosts(user.id));
    }
  }, [user, dispatch, posts.length]);

  if (!user) {
    return null;
  }

  return (
    <Spinner spinning={isLoading}>
      <Row justify='center' style={{ marginTop: '3%' }}>
        <Col span={6}>
          <Avatar id={id} user={user} />
          <UserButton id={id} user={user} />
          {(user.friends_visibility || !id) && (
            <FriendsPreview
              user={user}
              profile={profile}
              id={id}
              style={{
                minHeight: '5%',
                maxHeight: '17%',
                overflow: 'scroll',
              }}
            />
          )}
        </Col>

        <Col span={16} offset={1}>
          <Row>
            <Col span={22} className='username'>
              {`${user.first_name} ${user.last_name}`}
            </Col>
            <Col span={2} className='status'>
              online
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
                <Row
                  justify='space-around'
                  className='personal__album'
                  style={{ marginBottom: 50 }}
                >
                  <span style={{ marginLeft: 25 }}>
                    <Album images={user.album} />
                  </span>
                </Row>
              )}
              <Row>
                <Col>
                  <UploadImages id={id} user={user} />
                </Col>
              </Row>
            </>
          )}

          {!id && <NewPost />}
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

const Profile = () => {
  const { id } = useParams();

  return (
    <BaseProfile
      id={id}
      UserButton={id ? AddFriend : EditButton}
      UploadImages={UploadImages}
    />
  );
};

export default Profile;
