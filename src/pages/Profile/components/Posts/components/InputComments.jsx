import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../../../../redux/actions/commentActions';

const InputComments = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.profile);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    const newComment = {
      desc: content,
      likes: [],
      user: user,
      createdAt: new Date().toISOString(),
    };

    dispatch(createComment({ post, newComment, user }));
  };

  const [content, setContent] = useState('');
  return (
    <>
      <input
        type='text'
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Say</button>
    </>
  );
};

export default InputComments;
