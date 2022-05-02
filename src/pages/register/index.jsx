import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Layout from 'antd/lib/layout/layout';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Row, Col, message, Alert, Upload } from 'antd';
import { Card } from 'antd';

import { Types, register } from 'redux/actions/authActions';
import { updateAvatar } from 'redux/actions/profileActions';

import Center from 'components/Center';

import RegisterIllustration from 'assets/img/registration.png';
import MainLogo from 'assets/img/logo.svg';

import 'pages/Register/register.scss';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate('/');
  const ref = useRef();

  const [fileList, setFileList] = useState([]);

  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.alert.error);

  const handleUpload = (data) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('avatar', file);
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    dispatch(updateAvatar(auth, data.user, formData, config));
    setFileList([]);

    return 'success';
  };

  const onFinish = (values) => {
    const onSuccess = (status) => {
      if (status.status === Types.LOGIN_SUCCESS) {
        message.success('You are successfully registered');
      }
      navigate('/');
    };
    const data = {
      first_name: values.user.first_name,
      last_name: values.user.last_name,
      email: values.user.email,
      password_hash: values.password_hash,
    };

    dispatch(register(data)).then((res) => {
      handleUpload(res);
      onSuccess(res);
    });
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
              {error && <Alert message={error} type='error' />}

              <Form
                {...layout}
                name='register'
                onFinish={onFinish}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name={['user', 'first_name']}
                  label='Name'
                  rules={[
                    {
                      min: 3,
                      max: 12,
                      whitespace: false,
                      required: true,
                      message: 'Name should be at least 3 characters',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['user', 'last_name']}
                  label='Surname'
                  rules={[
                    {
                      min: 3,
                      max: 18,
                      whitespace: false,
                      required: true,
                      message: 'Surname should be at least 3 characters',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name={['user', 'email']}
                  label='Email'
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                  ]}
                >
                  <Input ref={ref} />
                </Form.Item>

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
                  label='Confirm Password'
                  dependencies={['password_hash']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (
                          !value ||
                          getFieldValue('password_hash') === value
                        ) {
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
