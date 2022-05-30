import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  message,
  Popconfirm,
  Tabs,
} from 'antd';

import { storage } from 'storage';

import { updateUser, deleteUser } from 'redux/actions/profileActions';
import { getProfile } from 'redux/actions/authActions';

import SettingCard from 'pages/Settings/SettingCard';

import { password_rules, password_confirm_rules } from 'pages/Register/rules';

const { TabPane } = Tabs;

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.profile);

  const onFinish = (values) => {
    const onSuccess = () => {
      message.success('You are successfully update your profile settings');
      dispatch(getProfile(user.id));
      navigate('/');
    };

    const data = {
      id: user.id,
      ...values,
    };

    dispatch(updateUser(data)).then(onSuccess);
  };

  const text = 'Are you sure to delete your account?';

  const confirm = () => {
    message.info('You have deleted your account');
    dispatch(deleteUser(user)).then(() => {
      storage.accessToken.Remove();
      window.location.href = '/register';
    });
  };

  return (
    <Tabs defaultActiveKey='1'>
      <TabPane tab='Privacy' key='1'>
        <Divider className='divider'>Privacy</Divider>
        <Form onFinish={onFinish}>
          <Form.Item name='posts_visibility'>
            <SettingCard
              title={'Show my posts '}
              checked={user.posts_visibility}
            />
          </Form.Item>

          <Form.Item name='friends_visibility'>
            <SettingCard
              title={'Show my friend list'}
              checked={user.friends_visibility}
            />
          </Form.Item>

          <Form.Item name='album_visibility'>
            <SettingCard
              title={'Show my photo-album'}
              checked={user.album_visibility}
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='settings__btn'>
              Save changes
            </Button>
          </Form.Item>
        </Form>
      </TabPane>

      <TabPane tab='Security' key='2'>
        <Divider className='divider'>Security</Divider>
        <Card>
          <Form
            name='basic'
            labelCol={{
              span: 3,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete='off'
          >
            <Form.Item
              label='Password'
              name='password_hash'
              rules={password_rules}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm'
              dependencies={['password_hash']}
              hasFeedback
              rules={password_confirm_rules}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                htmlType='submit'
                className='settings__password_btn'
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </TabPane>

      <TabPane tab='Delete profile' key='3'>
        <Divider className='divider'>Delete your profile</Divider>

        <Popconfirm
          title={text}
          okText='Yes'
          cancelText='No'
          onConfirm={confirm}
          placement='bottom'
        >
          <Button type='link' danger>
            Delete profile
          </Button>
        </Popconfirm>
      </TabPane>
    </Tabs>
  );
};

export default Settings;
