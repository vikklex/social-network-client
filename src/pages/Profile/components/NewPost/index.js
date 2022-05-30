import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Comment, Avatar } from 'antd';

import {
  createPost,
  getPosts,
  updatePostImage,
} from 'redux/actions/postActions';

import Editor from './components/Editor';

import NoAvatar from 'assets/img/noavatar.png';

import './newPost.scss';

const NewPost = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);

  const [content, setContent] = useState('');
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

    dispatch(updatePostImage({ postId, formData, config })).then(
      dispatch(getPosts(user.id)),
    );

    setFileList([]);
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const onSuccess = (res) => {
    handleUpload(res.payload.id);
    dispatch(getPosts(user.id));
  };

  const handleSubmit = () => {
    dispatch(createPost({ userId: user.id, content })).then((res) =>
      onSuccess(res),
    );

    setContent('');
  };

  return (
    <Comment
      avatar={<Avatar src={user.avatar || NoAvatar} alt='Avatar' />}
      style={{ marginTop: '12%' }}
      content={
        <Editor
          value={[content]}
          onChange={handleChange}
          onSubmit={handleSubmit}
          user={user}
          props={props}
          fileList={fileList}
          setFileList={setFileList}
          comment={false}
        />
      }
    />
  );
};

export default NewPost;
