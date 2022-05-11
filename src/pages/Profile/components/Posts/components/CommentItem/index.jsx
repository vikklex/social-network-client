import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Comment, Tooltip } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import moment from 'moment';

import { updateComment } from 'redux/actions/commentActions';
import { deleteComment } from 'redux/actions/commentActions';
import {
  createReaction,
  getPostReactions,
} from 'redux/actions/reactionActions';

import { DATE_FORMAT } from 'utils/Constants';

const CommentList = ({ comment }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);

  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(comment.desc);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  useEffect(() => {
    if (comment) {
      dispatch(getPostReactions(comment.id)).then((data) => {
        const likes = data?.filter(
          (reaction) => reaction.reactionType === 'like',
        );

        setLikes(likes?.length);

        const dislikes = data?.filter(
          (reaction) => reaction.reactionType === 'dislike',
        );

        for (const like of likes) {
          setIsLiked(like.userId === profile.id);
        }

        for (const dislike of dislikes) {
          setIsDisliked(dislike.userId === profile.id);
        }

        setDislikes(dislikes?.length);
      });
    }
  }, [comment, dispatch, likes, dislikes, profile.id]);

  const setLike = () => {
    dispatch(
      createReaction({
        reactionType: 'like',
        contentType: 'comment',
        userId: profile.id,
        postId: comment.id,
        likedUser: comment?.userId,
      }),
    ).then((data) => {
      const likes = data?.filter(
        (reaction) => reaction.reactionType === 'like',
      );

      const dislikes = data?.filter(
        (reaction) => reaction.reactionType === 'dislike',
      );

      setIsLiked(true);
      setIsDisliked(false);

      setLikes(likes?.length);
      setDislikes(dislikes?.length);
    });
  };

  const dislike = () => {
    dispatch(
      createReaction({
        reactionType: 'dislike',
        contentType: 'comment',
        userId: profile.id,
        postId: comment.id,
        likedUser: comment?.userId,
      }),
    ).then((data) => {
      const likes = data?.filter(
        (reaction) => reaction.reactionType === 'like',
      );

      const dislikes = data?.filter(
        (reaction) => reaction.reactionType === 'dislike',
      );

      setIsDisliked(true);
      setIsLiked(false);

      setDislikes(dislikes?.length);
      setLikes(likes?.length);
    });
  };

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
      <Tooltip key='comment-basic-like' title='Like'>
        <span onClick={setLike}>
          {isLiked && <LikeOutlined style={{ color: 'blue' }} />}
          {!isLiked && <LikeOutlined style={{ color: 'silver' }} />}
          <span className='comment-action'>{`${likes} ${isLiked}`}</span>
        </span>
      </Tooltip>

      <Tooltip key='comment-basic-dislike' title='Dislike'>
        <span onClick={dislike}>
          {isDisliked && <DislikeOutlined style={{ color: 'blue' }} />}
          {!isDisliked && <DislikeOutlined style={{ color: 'silver' }} />}
          <span className='comment-action'>{`${dislikes} ${isDisliked}`}</span>
        </span>
      </Tooltip>

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
