import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Row,
  Col,
  message,
  Alert,
} from 'antd';

import './login.scss';
import { Types, login } from '../../redux/actions/authActions';
import Center from '../../components/Center';

import LoginIllustration from './.././../assets/img/login.jpg';
import MainLogo from './.././../assets/img/logo.svg';
import Layout from 'antd/lib/layout/layout';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const error = useSelector((state) => state.alert.error);

  const onFinish = (values) => {
    const onSuccess = (status) => {
      if (status === Types.LOGIN_SUCCESS) {
        message.success('You are successfully login');
        navigate('/');
      }
    };

    const data = {
      email: values.email,
      password_hash: values.password_hash,
    };

    dispatch(login(data)).then(onSuccess);
  };

  useEffect(() => {
    const { input } = ref.current;
    input.focus();
  });

  return (
    <Layout>
      <Center minHeight='70vh'>
        <Row>
          <Col span={12}>
            <h3 className='login__title'>
              <img src={MainLogo} alt='main_logo'></img>
            </h3>
            <span className='login__description'>
              Cement friendship and family relations with "F_Network"
            </span>
          </Col>

          <Col span={12}>
            <Card
              hoverable
              className='register__card'
              cover={<img alt='example' src={LoginIllustration} />}
            >
              {error && (
                <>
                  <Alert message={error} type='error' />
                  <br />
                </>
              )}

              <Form
                name='basic'
                labelCol={{
                  span: 8,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                autoComplete='off'
              >
                <Form.Item
                  label='Email'
                  name='email'
                  rules={[
                    {
                      type: 'email',
                      required: true,
                      message: 'Please input your email!',
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
                  name='remember'
                  valuePropName='checked'
                  wrapperCol={{
                    offset: 8,
                  }}
                >
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                  }}
                >
                  <Button type='primary' htmlType='submit'>
                    Submit
                  </Button>
                </Form.Item>
              </Form>
              <div className='login__register_button'>
                <Button type='primary'>
                  <Link to='/register'>Create account</Link>
                </Button>
              </div>
            </Card>
          </Col>
        </Row>
      </Center>
    </Layout>
  );
};

export default Login;
