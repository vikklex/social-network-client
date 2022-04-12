import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Row, Col } from 'antd';
import { Card } from 'antd';

import { register } from '../../redux/actions/authActions';
import './register.scss';
import Center from '../../components/Center';

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

export default function Register() {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const data = {
      first_name: values.user.first_name,
      last_name: values.user.last_name,
      email: values.user.email,
      password_hash: values.password_hash,
    };

    dispatch(register(data));
  };

  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <Center>
      <Row>
        <Col span={12}>
          <h3 className='login__title'>
            <img src={pf + '/img/logo.svg'}></img>
          </h3>
          <span className='login__description'>
            Cement friendship and family relations with "F-network"
          </span>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            className='register__card'
            cover={<img alt='example' src={pf + '/img/registration.png'} />}
          >
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
                    max: 12,
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

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type='primary' htmlType='submit'>
                  Submit
                </Button>
              </Form.Item>
            </Form>
            <div className='login__register_button'>
              <Button type='primary'>
                <Link to='/login'>Already have an account?</Link>
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Center>
  );
}
