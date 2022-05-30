import React, { useEffect, useRef } from 'react';

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
  Layout,
} from 'antd';

import 'pages/Login/login.scss';

import { login } from 'redux/actions/authActions';

import Center from 'components/Center';

import LoginIllustration from 'assets/img/login.jpg';
import MainLogo from 'assets/img/logo.svg';

import { email_rules, password_rules } from 'pages/Login/rules';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  const onFinish = (values) => {
    const onSuccess = (data) => {
      if (data.payload.token) {
        message.success('You are successfully login');
        navigate('/');
      } else {
        message.error(`Error: ${data.payload.response.data.msg}`);
      }
    };

    const data = {
      email: values.email,
      password: values.password_hash,
    };

    dispatch(login(data)).then(onSuccess);
  };

  useEffect(() => {
    const { input } = ref.current;
    input.focus();
  });

  return (
    <Layout className='login__layout'>
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
              bordered={false}
              className='register__card'
              cover={<img alt='example' src={LoginIllustration} />}
            >
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
                <Form.Item label='Email' name='email' rules={email_rules}>
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
                <Form.Item
                  wrapperCol={{
                    offset: 8,
                  }}
                >
                  <Button
                    type='primary'
                    style={{ backgroundColor: 'silver', border: 'none' }}
                  >
                    <Link to='/register'>Create account</Link>
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

export default Login;
