import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card, Divider, Button, Input } from 'antd';

import Feed from './components/Feed/Feed';
import { getPosts } from '../../redux/actions/postActions';
import NewPost from './components/NewPost/NewPost';

import './profile.scss';
import { Navigate } from 'react-router-dom';

import Avatar from './components/AvatarUpload/Avatar';
import { updateUser } from '../../redux/actions/profileActions';

const Profile = (data) => {
  const authorizedUser = useSelector((state) => state.auth.user);

  const { auth } = useSelector((state) => state);

  const user = data.data[0] ? data.data[0] : authorizedUser;

  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.post);

  useEffect(() => {
    dispatch(getPosts(user._id));
  }, [user._id, dispatch, posts.length]);

  const [statusText, setStatusText] = useState(user.status ? user.status : '');
  const [visibleInput, setVisibleInput] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState(false);

  const onPressEnter = () => {
    dispatch(updateUser({ status: statusText }, auth));
    setStatusText('');
    setVisibleInput(true);
    setVisibleStatus(false);
  };

  const onChange = (event) => {
    setStatusText(event.target.value);
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
          <Button type='primary' onClick={() => setEdit(true)}>
            Edit profile
          </Button>
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
            <Input
              placeholder={'Set status...'}
              bordered={false}
              onPressEnter={onPressEnter}
              value={statusText}
              onChange={onChange}
              style={inputDisplay}
            />
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
          {user._id === authorizedUser._id && <NewPost />}
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
