import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Checkbox, Card, Row, Col } from 'antd';

import './login.scss';
import { login } from '../../redux/actions/authActions';
import Center from '../../components/Center';

const Login = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const data = {
      email: values.email,
      password_hash: values.password_hash,
    };

    dispatch(login(data));
  };

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Center minHeight='70vh'>
      <Row>
        <Col span={12}>
          <h3 className='login__title'>
            <img src={pf + '/img/logo.svg'}></img>
          </h3>
          <span className='login__description'>
            Cement friendship and family relations with "F_Network"
          </span>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            className='register__card'
            cover={<img alt='example' src={pf + '/img/login.jpg'} />}
          >
            <Form
              name='basic'
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
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
                <Input />
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
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
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
  );
};

export default Login;
