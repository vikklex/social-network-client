import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Col, Row, Card, Divider, Button, Input } from 'antd';

import jwt_decode from 'jwt-decode';

import Feed from './components/Feed';
import { getPosts } from '../../redux/actions/postActions';
import NewPost from './components/NewPost';

import './profile.scss';
import { Navigate } from 'react-router-dom';

import Avatar from './components/AvatarUpload';
import { updateUser } from '../../redux/actions/profileActions';

import { getUserProfile } from '../../redux/actions/profileActions';

const Profile = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.profile.user);

  const [statusText, setStatusText] = useState(user?.status);
  const [edit, setEdit] = useState(false);

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
  }, [dispatch, id, token, user]);

  useEffect(() => {
    if (user) {
      dispatch(getPosts(user.id));
    }
  }, [user, dispatch, posts.length]);

  const [visibleInput, setVisibleInput] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState(false);

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

  return (
    <>
      <Row justify='center' style={{ marginTop: '3%' }}>
        <Col span={6}>
          <Avatar auth={auth} user={user} />
          {!id && (
            <Button type='primary' size='large' onClick={() => setEdit(true)}>
              Edit profile
            </Button>
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
                {user.followers.length ? user.followers.length : 0}
              </div>
              <div className='personal__numbers_following'>Followers</div>
            </Col>
            <Col span={4}>
              <div className='personal__numbers_number'>
                {user.followings.length ? user.followings.length : 0}
              </div>
              <div className='personal__numbers_followers'>Followings</div>
            </Col>
            <Col span={4}>
              <div className='personal__numbers_number'>{posts.length}</div>
              <div className='personal__numbers_posts'>Posts</div>
            </Col>
          </Row>
          {user && <NewPost />}
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
