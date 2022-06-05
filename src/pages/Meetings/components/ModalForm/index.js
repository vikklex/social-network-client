import React from 'react';
import { useSelector } from 'react-redux';

import { Button, Form, Input, Select, TimePicker } from 'antd';

import {
  title_rules,
  description_rules,
  choice_rules,
} from 'pages/Meetings/rules';
import FriendItem from 'pages/Friends/FriendItem';

import { TIME_FORMAT } from 'utils/Constants';

const { Option } = Select;

function ModalForm({ onFinish, initialValue, isMainComponent }) {
  const friends = useSelector((state) => state.auth.profile.followings);

  return (
    <Form
      onFinish={onFinish}
      name='basic'
      initialValues={isMainComponent ? initialValue : null}
      labelCol={{
        span: 7,
      }}
      data-test='modal'
    >
      <Form.Item label='Title' name='title' rules={title_rules}>
        <Input />
      </Form.Item>

      <Form.Item
        label='Description'
        name='description'
        rules={description_rules}
      >
        <Input />
      </Form.Item>

      <Form.Item name='importance' label='Importance' rules={choice_rules}>
        <Select placeholder='Select importance'>
          <Option value='success'>Low</Option>
          <Option value='warning'>Medium</Option>
          <Option value='error'>Hight</Option>
        </Select>
      </Form.Item>

      <Form.Item label='Participants' name='participants' rules={choice_rules}>
        <Select mode='multiple'>
          {friends.map((friend) => (
            <Select.Option value={friend} key={friend}>
              <FriendItem id={friend} content='meeting' />
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label='Start time:' name='startTime' rules={choice_rules}>
        <TimePicker format={TIME_FORMAT} />
      </Form.Item>

      <Form.Item label='End time:' name='endTime' rules={choice_rules}>
        <TimePicker format={TIME_FORMAT} />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Set meeting
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ModalForm;
