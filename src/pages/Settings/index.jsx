import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Divider, Form, Input, message, Tabs } from 'antd';

import { Profile_Types, updateUser } from 'redux/actions/profileActions';
import { getUserProfile } from 'redux/actions/authActions';

import SettingCard from 'pages/Settings/SettingCard';

const { TabPane } = Tabs;

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.profile);

  const onFinish = (values) => {
    const onSuccess = (status) => {
      if (status === Profile_Types.SUCCESS) {
        message.success('You are successfully update your profile settings');
        dispatch(getUserProfile({ id: user.id }));
        navigate('/');
      }
    };

    const data = {
      id: user.id,
      ...values,
    };

    dispatch(updateUser(data)).then(onSuccess);
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
              rules={[
                {
                  required: true,
                  min: 6,
                  max: 32,
                  whitespace: false,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name='confirm'
              label='Confirm'
              dependencies={['password_hash']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password_hash') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
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
    </Tabs>
  );
};

export default Settings;
