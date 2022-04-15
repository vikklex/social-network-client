import React from 'react';
import { Col, Row, Card, Divider } from 'antd';

import './profile.scss';

import NoAvatar from './../../assets/img/noavatar.png';

const Profile = (data) => {
  const user = data.data[0] ? data.data[0] : data.data;
  return (
    <>
      <Row justify='center' style={{ marginTop: '3%' }}>
        <Col span={6}>
          <img
            src={user.avatar ? user.avatar : { NoAvatar }}
            alt='personal_avatar'
            className='profile__personal_avatar'
          />
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
          <Row>
            <div className='site-card-border-less-wrapper profile'>
              <Card title='Personal info:' bordered={false}>
                <p>
                  <span className='personal_primary_key'>Birthday:</span>
                  <span className='personal_primary_value'>14 February</span>
                </p>
                <p>
                  <span className='personal_primary_key'>City:</span>
                  <span className='personal_primary_value'>Miami</span>
                </p>
                <p>
                  <span className='personal_primary_key'>From:</span>
                  <span className='personal_primary_value'>Belarus</span>
                </p>
                <p>
                  <span className='personal_primary_key'>Education:</span>
                  <span className='personal_primary_value'>BSU</span>
                </p>
              </Card>
            </div>
            <Divider orientation='left'>Personal description</Divider>
            <p className='personal_description'>
              I'm Helen Galachinskaya. I was born on the 23 of December 1993 in
              Aktobe. My sign of the zodiac is Capricorn. Capricorns are
              generally serious about whatever they do. Capricorns are
              down-to-earth.
            </p>
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
              <div className='personal__numbers_number'>3</div>
              <div className='personal__numbers_posts'>Posts</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};

export default Profile;
