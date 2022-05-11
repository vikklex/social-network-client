import { Avatar, Comment, Tooltip } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from 'redux/actions/commentActions';

import moment from 'moment';

import { DATE_FORMAT } from 'utils/Constants';
import TextArea from 'antd/lib/input/TextArea';
import { updateComment } from 'redux/actions/commentActions';

const CommentList = ({ comment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);

  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(comment.desc);

  const handleDelete = () => {
    dispatch(deleteComment(comment, comment.postAuthor));
  };

  const saveComment = () => {
    dispatch(updateComment(comment.id, profile.id, text));
    setIsEditMode(false);
  };

  const isAuthor = comment.userId === profile.id;
  const actions = [
    <>
      {!isEditMode && isAuthor && (
        <span key='comment-basic-edit' onClick={() => setIsEditMode(true)}>
          Edit
        </span>
      )}
      {isAuthor && (
        <span key='comment-basic-delete' onClick={handleDelete}>
          Delete
        </span>
      )}
    </>,

    <>
      {isEditMode && (
        <span key='comment-basic-save' onClick={saveComment}>
          Save
        </span>
      )}
    </>,
  ];

  return (
    <Comment
      actions={actions}
      avatar={
        <Avatar
          src={comment.userData.avatar}
          alt='Avatar'
          onClick={() => navigate(`/user/${comment.userData.id}`)}
        />
      }
      author={`${comment.userData.first_name} ${comment.userData.last_name}`}
      content={
        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          bordered={isEditMode}
          autoSize={false}
          style={{
            resize: 'none',
            pointerEvents: isEditMode ? 'all' : 'none',
          }}
        />
      }
      datetime={
        <Tooltip title={moment().format(DATE_FORMAT)}>
          <span>{moment(comment.createdAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default CommentList;
