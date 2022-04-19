import React, { useState } from 'react';
import {
  Comment,
  Avatar,
  Form,
  Button,
  List,
  Input,
  Row,
  Col,
  Tag,
} from 'antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/actions/postActions';
import { useSelector } from 'react-redux';

import { PermMedia, Label, Room } from '@material-ui/icons';
import { PictureOutlined, PushpinFilled } from '@ant-design/icons';

import NoAvatar from './../../assets/img/noavatar.png';
import './newPost.scss';
const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout='horizontal'
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value, user }) => (
  <>
    <Form.Item>
      <TextArea
        className='new__post'
        rows={4}
        onChange={onChange}
        value={value}
        placeholder={`What's new, ${user.first_name}?`}
      />
      <Row>
        <Col span={3}>
          <PictureOutlined className='post__icon' />
          <span>Image</span>
        </Col>
        <Col span={3}>
          <PushpinFilled className='post__icon' />
          <Tag color='blue'>Tag</Tag>
        </Col>
      </Row>
    </Form.Item>
    <Form.Item>
      <Button
        htmlType='submit'
        loading={submitting}
        onClick={onSubmit}
        type='primary'
      >
        Share
      </Button>
    </Form.Item>
  </>
);

const NewPost = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(createPost({ userId, content }));
    setContent('');
  };

  return (
    <Comment
      avatar={<Avatar src={user.avatar || NoAvatar} alt='Han Solo' />}
      content={
        <Editor
          value={[content]}
          onChange={handleChange}
          onSubmit={handleSubmit}
          user={user}
        />
      }
    />
  );
};

export default NewPost;
