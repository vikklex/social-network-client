import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Comment, Avatar } from 'antd';

import { createPost } from 'redux/actions/postActions';
import { updatePostImage } from 'redux/actions/postActions';

import Editor from './components/Editor';

import NoAvatar from 'assets/img/noavatar.png';
import './newPost.scss';

const NewPost = () => {
  const user = useSelector((state) => state.profile.user);
  const userId = user.id;
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
      handleUpload(res.data.id);
    });
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
