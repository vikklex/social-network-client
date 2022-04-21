import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
  Upload,
} from 'antd';
import { PictureOutlined, PushpinFilled } from '@ant-design/icons';

import { createPost } from '../../../../redux/actions/postActions';
import { updatePostImage } from '../../../../redux/actions/postActions';

import NoAvatar from './../../../../assets/img/noavatar.png';
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

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value,
  user,
  props,
  fileList,
}) => {
  return (
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
          <Col span={6}>
            <Upload {...props}>
              <Button icon={<PictureOutlined className='post__icon' />}>
                Select File
              </Button>
            </Upload>
            <Button
              type='primary'
              disabled={fileList.length === 0}
              style={{ marginTop: 16 }}
            ></Button>
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
};

const NewPost = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user._id;
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  const [fileList, setFileList] = useState([]);

  const props = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  const handleUpload = (postId) => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('img', file);
    });

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    dispatch(updatePostImage(postId, formData, config));
    setFileList([]);
  };
  const handleChange = (e) => {
    setContent(e.target.value);
  };
  const handleSubmit = () => {
    dispatch(createPost({ userId, content })).then((res) => {
      handleUpload(res.data._id);
    });
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
          props={props}
          fileList={fileList}
          setFileList={setFileList}
        />
      }
    />
  );
};

export default NewPost;
