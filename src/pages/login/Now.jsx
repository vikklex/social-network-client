import { useState } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Form, Input, Button, Checkbox } from 'antd';

import './login.scss';
import { login } from '../../store/actions/authActions';

export default function Login() {
  const defaultState = { email: '', password_hash: '' };

  const [userData, setUserData] = useState(defaultState);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);

  const { email, password_hash } = userData;
  const navigate = useNavigate();

  const onFinish = (values) => {
    const onSuccess = () => {
      if (auth.token) {
        navigate('/');
      }
    };
    setUserData({
      email: values.email,
      password_hash: values.password_hash,
    });

    dispatch(login(userData).then(onSuccess));
  };

  return (
    <div>
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
          value={email}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password_hash'
          value={password_hash}
          rules={[
            {
              required: true,
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
          <Button
            type='primary'
            htmlType='submit'
            onClick={() => dispatch(login(email, password_hash))}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
