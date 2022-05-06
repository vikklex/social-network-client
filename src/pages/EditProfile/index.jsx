import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Card,
  message,
} from 'antd';

import moment from 'moment';

import { Profile_Types, updateUser } from 'redux/actions/profileActions';
import { getUserProfile } from 'redux/actions/authActions';

import './editProfile.scss';

const { Option } = Select;

const EditProfile = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const user = useSelector((state) => state.auth.profile);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    const onSuccess = (status) => {
      if (status === Profile_Types.SUCCESS) {
        message.success('You are successfully update profile');
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
    <Card>
      <Row className='edit__profile'>
        <Col span={4}></Col>

        <Col span={20}>
          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            initialValues={{
              ...user,
              birthday: user?.birthday ? moment(user?.birthday) : moment(),
            }}
          >
            <Form.Item
              name='first_name'
              label='Name'
              rules={[
                {
                  min: 3,
                  max: 12,
                  whitespace: false,
                  message: 'Name should be at least 3 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='last_name'
              label='Surname'
              rules={[
                {
                  min: 3,
                  max: 12,
                  whitespace: false,
                  message: 'Surname should be at least 3 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name='desc'
              label='About'
              tooltip='Tell something interesting about you'
            >
              <Input.TextArea showCount maxLength={800} />
            </Form.Item>

            <Form.Item name={'gender'} label='Gender'>
              <Select placeholder='select your gender'>
                <Option value='male'>Male</Option>
                <Option value='female'>Female</Option>
                <Option value='other'>Other</Option>
              </Select>
            </Form.Item>

            <Form.Item name={'relationships'} label='Relationships'>
              <Select placeholder='select your relations status'>
                <Option value='single'>Single</Option>
                <Option value='married'>Married</Option>
                <Option value='fall in love'>Fall in love</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name='city'
              label='City'
              rules={[
                {
                  min: 3,
                  max: 12,
                  whitespace: false,
                  message: 'City name should be at least 3 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='from'
              label='From'
              rules={[
                {
                  min: 3,
                  max: 12,
                  whitespace: false,
                  message: 'City from  should be at least 3 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='job'
              label='Job'
              rules={[
                {
                  min: 3,
                  max: 12,
                  whitespace: false,
                  message: 'Job description should be at least 3 characters',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item name='birthday' label='Birthday'>
              <DatePicker />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
                Change Info
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default EditProfile;
