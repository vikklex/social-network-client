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
import { getAuthUserProfile } from 'redux/actions/authActions';

import {
  city_rules,
  job_rules,
  name_rules,
  surname_rules,
} from 'pages/EditProfile/rules';

import 'pages/EditProfile/editProfile.scss';

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
        dispatch(getAuthUserProfile({ id: user.id }));
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
            <Form.Item name='first_name' label='Name' rules={name_rules}>
              <Input />
            </Form.Item>

            <Form.Item name='last_name' label='Surname' rules={surname_rules}>
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
                <Option value='Male'>Male</Option>
                <Option value='Female'>Female</Option>
                <Option value='Other'>Other</Option>
              </Select>
            </Form.Item>

            <Form.Item name={'relationships'} label='Relationships'>
              <Select placeholder='select your relations status'>
                <Option value='Single'>Single</Option>
                <Option value='Married'>Married</Option>
                <Option value='Fall in love'>Fall in love</Option>
              </Select>
            </Form.Item>

            <Form.Item name='city' label='City' rules={city_rules}>
              <Input />
            </Form.Item>

            <Form.Item name='from' label='From' rules={city_rules}>
              <Input />
            </Form.Item>

            <Form.Item name='job' label='Job' rules={job_rules}>
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