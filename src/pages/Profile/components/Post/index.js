import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Comment, Image, List, Input, Tooltip, Card } from 'antd';

import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import moment from 'moment';

import { deletePost, updatePost } from 'redux/actions/postActions';
import {
  createReaction,
  getPostReactions,
} from 'redux/actions/reactionActions';

import { DATE_FORMAT } from 'utils/Constants';
import NoAvatar from 'assets/img/noavatar.png';

const { TextArea } = Input;

const Post = ({ post, isUserProfile }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);
  const profile = useSelector((state) => state.auth.profile);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(post.desc);

  useEffect(() => {
    if (post) {
      dispatch(getPostReactions(post.id)).then((data) => {
        const likes = data?.filter(
          (reaction) => reaction.reactionType === 'like',
        );
        for (const like of likes) {
          setIsLiked(like.userId === profile.id);
          setIsDisliked(false);
        }

        setLikes(likes?.length);

        const dislikes = data?.filter(
          (reaction) => reaction.reactionType === 'dislike',
        );
        for (const dislike of dislikes) {
          setIsDisliked(dislike.userId === profile.id);
          setIsLiked(false);
        }

        setDislikes(dislikes?.length);
      });
    }
  }, [post, dispatch, likes, dislikes, profile.id]);

  const setLike = () => {
    dispatch(
      createReaction({
        reactionType: 'like',
        userId: profile.id,
        postId: post.id,
        likedUser: user.id || post.userId,
      }),
    ).then((data) => {
      const likes = data?.filter(
        (reaction) => reaction.reactionType === 'like',
      );
      const dislikes = data?.filter(
        (reaction) => reaction.reactionType === 'dislike',
      );

      setLikes(likes?.length);
      setDislikes(dislikes?.length);
    });
  };

  const dislike = () => {
    dispatch(
      createReaction({
        reactionType: 'dislike',
        userId: profile.id,
        postId: post.id,
        likedUser: user.id || post.userId,
      }),
    ).then((data) => {
      const likes = data?.filter(
        (reaction) => reaction.reactionType === 'like',
      );
      const dislikes = data?.filter(
        (reaction) => reaction.reactionType === 'dislike',
      );

      setDislikes(dislikes?.length);
      setLikes(likes?.length);
    });
  };

  const savePost = () => {
    dispatch(updatePost(post.id, user.id, text));
    setIsEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(post, user.id));
  };

  const targetData = isUserProfile ? user : post;
  const userId = isUserProfile ? user.id : post.userId;

  const postAuthor = `${targetData.first_name} ${targetData.last_name}`;
  const userAvatar = targetData.avatar;

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={setLike}>
        {isLiked && <LikeOutlined style={{ color: 'blue' }} />}
        {!isLiked && <LikeOutlined style={{ color: 'silver' }} />}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,

    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span onClick={dislike}>
        {isDisliked && <DislikeOutlined style={{ color: 'blue' }} />}
        {!isDisliked && <DislikeOutlined style={{ color: 'silver' }} />}
        <span className='comment-action'>{dislikes}</span>
      </span>
    </Tooltip>,

    <span key='comment-basic-reply-to'>Reply to</span>,

    <>
      {!isEditMode && !id && isUserProfile && (
        <span key='comment-basic-edit' onClick={() => setIsEditMode(true)}>
          Edit
        </span>
      )}
      {!id && isUserProfile && (
        <span key='comment-basic-delete' onClick={handleDelete}>
          Delete
        </span>
      )}
    </>,

    <>
      {isEditMode && isUserProfile && (
        <span key='comment-basic-save' onClick={savePost}>
          Save
        </span>
      )}
    </>,
  ];

  return (
    <Card bordered={false} style={{ width: '100%' }}>
      <Comment
        actions={actions}
        author={<p>{postAuthor}</p>}
        avatar={
          <Avatar
            onClick={() => {
              !isUserProfile && navigate(`/user/${userId}`);
            }}
            src={userAvatar ? userAvatar : NoAvatar}
          />
        }
        content={
          <>
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

            {post.img && post.img.length !== 0 && (
              <List
                grid={{
                  gutter: 8,
                  xs: 1,
                }}
                dataSource={post.img}
                locale={{ emptyText: () => null }}
                renderItem={(img) => (
                  <List.Item>
                    <Image
                      width={post.img.length <= 2 ? 250 : 150}
                      padding={20}
                      src={img}
                    />
                  </List.Item>
                )}
              />
            )}
          </>
        }
        datetime={
          <Tooltip title={moment().format(DATE_FORMAT)}>
            <span>{moment(post.createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </Card>
  );
};

export default Post;
