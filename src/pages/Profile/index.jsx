import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Col, Row, Divider, Button, Upload } from 'antd';
import { CheckOutlined, PaperClipOutlined } from '@ant-design/icons';

import jwt_decode from 'jwt-decode';

import { getPosts } from 'redux/actions/postActions';
import { updateAlbum } from 'redux/actions/profileActions';
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

import 'pages/Profile/profile.scss';
import { getAuthUserProfile } from '../../redux/actions/authActions';

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.profile.user);
  const profile = useSelector((state) => state.auth.profile);
  const posts = useSelector((state) => state.post.post);

  const [statusText, setStatusText] = useState(user?.status);
  const [edit, setEdit] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);
  const [fileList, setFileList] = useState([]);

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

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('album', file);
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    dispatch(updateAlbum(user, formData, config));
    setFileList([]);
  };

  return (
    <Spinner spinning={isLoading}>
      <Row justify='center' style={{ marginTop: '3%' }}>
        <Col span={6}>
          <Avatar id={id} user={user} />

          {!id ? (
            <Button
              type='primary'
              onClick={() => setEdit(true)}
              className='edit__button'
            >
              Edit profile
            </Button>
          ) : (
            <AddFriend user={user} />
          )}

          {(user.friends_visibility || !id) && (
            <FriendsPreview
              user={user}
              profile={profile}
              id={id}
              style={{
                minHeight: '5%',
                maxHeight: '14%',
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
          {edit && <Navigate to='/edit' />}
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
                  {!id && (
                    <Upload {...props}>
                      <span className='personal__photos_upload'>
                        <PaperClipOutlined />
                        Add photos to album
                      </span>
                    </Upload>
                  )}
                  {fileList.length !== 0 && (
                    <span
                      className='personal__photos_upload'
                      onClick={handleUpload}
                      disabled={fileList.length === 0}
                    >
                      <CheckOutlined />
                      Press to start upload
                    </span>
                  )}
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

export default Profile;
