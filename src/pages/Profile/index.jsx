import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Col, Row, Card, Divider, Button, Input, Upload } from 'antd';

import jwt_decode from 'jwt-decode';

import Feed from './components/Feed';
import NewPost from './components/NewPost';
import Album from './components/Album';
import ModalArea from './Modal';
import { getPosts } from '../../redux/actions/postActions';

import './profile.scss';
import { Navigate } from 'react-router-dom';

import Avatar from './components/AvatarUpload';
import { updateAlbum, updateUser } from '../../redux/actions/profileActions';

import { getUserProfile } from '../../redux/actions/profileActions';
import { CheckOutlined, PaperClipOutlined } from '@ant-design/icons';
import AddFriend from './components/AddFriend';

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);

  const [statusText, setStatusText] = useState(user?.status);
  const [edit, setEdit] = useState(false);

  const [visibleInput, setVisibleInput] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [fileList, setFileList] = useState([]);

  const posts = useSelector((state) => state.post.post);

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

  const onPressEnter = () => {
    dispatch(updateUser({ status: statusText, id: user.id }));
    setStatusText('');
    setVisibleInput(true);
    setVisibleStatus(false);
  };

  const changeVisibility = () => {
    setVisibleInput(false);
    setVisibleStatus(true);
  };

  const birthday = user.birthday
    ? new Date(user.birthday).toLocaleDateString()
    : '';

  const statusDisplay = visibleStatus
    ? { display: 'none' }
    : { display: 'block' };

  const inputDisplay =
    user.status && visibleInput ? { display: 'none' } : { display: 'block' };

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
    <>
      <Row justify='center' style={{ marginTop: '3%' }}>
        <Col span={6}>
          <Avatar id={id} user={user} />
          {!id && (
            <Button type='primary' size='large' onClick={() => setEdit(true)}>
              Edit profile
            </Button>
          )}
          {id && <AddFriend user={user} />}
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
            {user.status && (
              <span onClick={changeVisibility} style={statusDisplay}>
                {user.status}
              </span>
            )}
            {!id && (
              <Input
                placeholder={user.status || 'Set status...'}
                bordered={false}
                onPressEnter={onPressEnter}
                value={statusText}
                onChange={(event) => setStatusText(event.target.value)}
                style={inputDisplay}
              />
            )}
          </Row>
          {edit && <Navigate to='/edit' />}
          <Row>
            <div className='site-card-border-less-wrapper profile'>
              <Card title='Personal info:' bordered={false}>
                <p>
                  <span className='personal_primary_key'>Birthday:</span>
                  <span className='personal_primary_value'>{birthday}</span>
                </p>

                <p>
                  <span className='personal_primary_key'>City:</span>
                  <span className='personal_primary_value'>{user.city}</span>
                </p>

                <p>
                  <span className='personal_primary_key'>From:</span>
                  <span className='personal_primary_value'>{user.from}</span>
                </p>

                {user.gender && (
                  <p>
                    <span className='personal_primary_key'>Gender:</span>
                    <span className='personal_primary_value'>
                      {user.gender}
                    </span>
                  </p>
                )}

                {user.relationships && (
                  <p>
                    <span className='personal_primary_key'>Relationships:</span>
                    <span className='personal_primary_value'>
                      {user.relationships}
                    </span>
                  </p>
                )}
              </Card>
            </div>
            <h3>Personal description:</h3>
            <p className='personal_description'>{user.desc}</p>
          </Row>
          <Divider />
          <Row justify='space-between' className='personal__numbers'>
            <Col span={4}>
              <div className='personal__numbers_number'>
                {user.followings.length ? user.followings.length : 0}
              </div>
              <div className='personal__numbers_following'>
                Following I follow
              </div>
            </Col>
            <Col span={4}>
              <div className='personal__numbers_number'>
                {user.followers.length ? user.followers.length : 0}
              </div>
              <div className='personal__numbers_followers'>Followers</div>
            </Col>
            <Col span={4}>
              <div className='personal__numbers_number'>{posts.length}</div>
              <div className='personal__numbers_posts'>Posts</div>
            </Col>
          </Row>
          <Row justify='space-between' style={{ marginBottom: 20 }}>
            <Col className='personal_primary_key'>
              {`${user.first_name}'s photos`} ({user.album.length})
            </Col>
            {user.album.length !== 0 && (
              <Col>
                <span
                  onClick={() => setVisibleModal(true)}
                  className='personal__album_href'
                >
                  See all photos
                </span>
              </Col>
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
              style={{ marginBottom: 30 }}
            >
              <p style={{ marginLeft: 25 }}>
                <Album images={user.album} />
              </p>
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
          {!id && <NewPost />}
        </Col>
      </Row>
      <Row>
        <Col>
          <Feed />
        </Col>
      </Row>
    </>
  );
};

export default Profile;
