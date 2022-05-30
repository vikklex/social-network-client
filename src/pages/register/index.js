import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import Layout from 'antd/lib/layout/layout';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, message, Upload } from 'antd';
import { Card } from 'antd';

import { getProfile, register } from 'redux/actions/authActions';
import { getUserProfile, updateAvatar } from 'redux/actions/profileActions';

import Center from 'components/Center';

import {
  name_rules,
  surname_rules,
  email_rules,
  password_confirm_rules,
  password_rules,
  validate_messages,
} from 'pages/Register/rules';

import RegisterIllustration from 'assets/img/registration.png';
import MainLogo from 'assets/img/logo.svg';

import 'pages/Register/register.scss';

const layout = {
  labelCol: {
    span: 9,
  },
  wrapperCol: {
    span: 16,
  },
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const [fileList, setFileList] = useState([]);

  const handleUpload = (user) => {
    const onSuccess = (data) => {
      dispatch(getUserProfile(data.payload.id));
      dispatch(getProfile(data.payload.id));
    };

    const formData = new FormData();

    fileList.forEach((file) => {
      formData.append('avatar', file);
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    dispatch(updateAvatar({ user, formData, config })).then(onSuccess);
    setFileList([]);

    return 'success';
  };

  const onFinish = (values) => {
    const onSuccess = (data) => {
      if (data.payload.token) {
        message.success('You are successfully registered');
        handleUpload(data.payload.user);
        navigate('/');
      } else {
        message.error(`Error: ${data.payload.response.data}`);
      }
    };

    const data = {
      first_name: values.user.first_name,
      last_name: values.user.last_name,
      email: values.user.email,
      password: values.password_hash,
    };

    dispatch(register(data)).then(onSuccess);
  };

  useEffect(() => {
    const { input } = ref.current;
    input.focus();
  });

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <Layout className='register__layout'>
      <Center>
        <Row>
          <Col span={12}>
            <h3 className='login__title'>
              <img src={MainLogo} alt='main_logo'></img>
            </h3>
            <span className='login__description'>
              Cement friendship and family relations with "F-network"
            </span>
          </Col>
          <Col span={12}>
            <Card
              hoverable
              className='register__card'
              bordered={false}
              cover={<img alt='example' src={RegisterIllustration} />}
            >
              <Form
                {...layout}
                name='register'
                onFinish={onFinish}
                validateMessages={validate_messages}
              >
                <Form.Item
                  name={['user', 'first_name']}
                  label='Name'
                  rules={name_rules}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['user', 'last_name']}
                  label='Surname'
                  rules={surname_rules}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['user', 'email']}
                  label='Email'
                  rules={email_rules}
                >
                  <Input ref={ref} />
                </Form.Item>

                <Form.Item
                  label='Password'
                  name='password_hash'
                  rules={password_rules}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name='confirm'
                  label='Confirm Password'
                  dependencies={['password_hash']}
                  hasFeedback
                  rules={password_confirm_rules}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item label='Choose Avatar'>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select file</Button>
                  </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                  <Button
                    type='primary'
                    style={{ backgroundColor: 'silver', border: 'none' }}
                  >
                    <Link to='/login'>Already have an account?</Link>
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </Center>
    </Layout>
  );
};

export default Register;
