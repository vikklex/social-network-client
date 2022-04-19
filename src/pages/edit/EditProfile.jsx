import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  message,
} from 'antd';

import { Types } from '../../redux/actions/authActions';
import { updateUser } from '../../redux/actions/profileActions';
import { editDataChecker } from '../../utils/editDataChecker';

import './editProfile.scss';

const EditProfile = () => {
  const { Option } = Select;

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
  const { auth } = useSelector((state) => state);
  const authUser = useSelector((state) => state.auth.user);

  //const [avatar, setAvatar] = useState('');

  const changeAvatar = () => {};

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (values) => {
    const onSuccess = (status) => {
      if (status === Types.LOGIN_SUCCESS) {
        message.success('You are successfully registered');
      }
    };

    const data = editDataChecker(values, authUser);
    dispatch(updateUser(data, auth)).then(onSuccess);
  };

  return (
    <Row className='edit__profile'>
      <Col span={6}>
        <img
          //src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
          alt='avatar'
          className='edit__avatar'
        ></img>
        <input
          type='file'
          id='file-upload'
          accept='image/*'
          onChange={changeAvatar}
        ></input>
      </Col>

      <Col span={18}>
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name={['user', 'first_name']}
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
            name={['user', 'last_name']}
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
            name={['user', 'email']}
            label='E-mail'
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={['user', 'password_hash']}
            label='Password'
            rules={[
              {
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name={['user', 'desc']}
            label='About'
            tooltip='Tell something interesting about you'
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item name={['user', 'gender']} label='Gender'>
            <Select placeholder='select your gender'>
              <Option value='male'>Male</Option>
              <Option value='female'>Female</Option>
              <Option value='other'>Other</Option>
            </Select>
          </Form.Item>

          <Form.Item name={['user', 'relationships']} label='Relationships'>
            <Select placeholder='select your relations status'>
              <Option value='single'>Single</Option>
              <Option value='married'>Married</Option>
              <Option value='fall in love'>Fall in love</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name={['user', 'city']}
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
            name={['user', 'from']}
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
            name={['user', 'job']}
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

          <Form.Item name={['user', 'birthday']} label='Birthday'>
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
  );
};

export default EditProfile;
