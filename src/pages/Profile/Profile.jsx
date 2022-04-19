import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Card, Divider, Button } from 'antd';

import Feed from './components/Feed/Feed';
import { getPosts } from '../../redux/actions/postActions';
import NewPost from './components/NewPost/NewPost';

import './profile.scss';
import NoAvatar from './../../assets/img/noavatar.png';
import { Navigate } from 'react-router-dom';

const Profile = (data) => {
  const authorizedUser = useSelector((state) => state.auth.user);

  const user = data.data[0] ? data.data[0] : authorizedUser;

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.post);

  useEffect(() => {
    dispatch(getPosts(user._id));
  }, [user._id, dispatch, posts.length]);

  const [edit, setEdit] = useState(false);

  const birthday = user.birthday
    ? new Date(user.birthday).toLocaleDateString()
    : '';

  return (
    <>
      <Row justify='center' style={{ marginTop: '3%' }}>
        <Col span={6}>
          <img
            src={user.avatar ? user.avatar : NoAvatar}
            alt='personal_avatar'
            className='profile__personal_avatar'
          />
          <Button type='primary' onClick={() => setEdit(true)}>
            Edit profile
          </Button>
        </Col>

        <Col span={16}>
          <Row>
            <Col span={22} className='username'>
              {`${user.first_name} ${user.last_name}`}
            </Col>
            <Col span={2} className='status'>
              online
            </Col>
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
                <p>
                  <span className='personal_primary_key'>Education:</span>
                  <span className='personal_primary_value'>BSU</span>
                </p>
              </Card>
            </div>
            <Divider orientation='left'>Personal description</Divider>
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
