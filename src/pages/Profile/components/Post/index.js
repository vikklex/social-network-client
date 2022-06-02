import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Comment, Image, List, Input, Tooltip, Card } from 'antd';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import moment from 'moment';

import { updatePost, deletePost, getPosts } from 'redux/actions/postActions';
import { getPostReactions, createReaction } from 'redux/actions/reactionAction';

import {
  createComment,
  deleteComment,
  getComments,
} from 'redux/actions/commentAction';

import Editor from 'pages/Profile/components/NewPost/components/Editor';
import PostComments from 'pages/Profile/components/Posts/components/CommentList';

import { DATE_FORMAT } from 'utils/Constants';

import NoAvatar from 'assets/img/noavatar.png';

const { TextArea } = Input;

const Post = ({ post, isUserProfile }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);
  const profile = useSelector((state) => state.auth.profile);
  const socket = useSelector((state) => state.socket);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);

  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [text, setText] = useState(post.desc);

  const [reply, setReply] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (post) {
      dispatch(getPostReactions(post.id)).then((data) => {
        const likes = data?.payload.filter(
          (reaction) => reaction.reactionType === 'like',
        );

        setLikes(likes?.length);

        const dislikes = data?.payload.filter(
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
  }, [post, dispatch, likes, dislikes, profile.id]);

  useEffect(
    () => {
      dispatch(getComments(post.id)).then((data) => setComments(data.payload));
    },
    [dispatch, post.id],
    comments,
  );

  const likedUser = id ? user?.id : post?.userId;

  const setLike = () => {
    dispatch(
      createReaction({
        reactionType: 'like',
        userId: profile.id,
        postId: post.id,
        likedUser: likedUser,
        socket: socket,
        user: profile,
        post: post,
      }),
    ).then((data) => {
      const likes = data?.payload.filter(
        (reaction) => reaction.reactionType === 'like',
      );

      const dislikes = data?.payload.filter(
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
        userId: profile.id,
        postId: post.id,
        likedUser: user?.id || post?.userId,
        socket: socket,
        user: profile,
      }),
    ).then((data) => {
      const likes = data?.payload.filter(
        (reaction) => reaction.reactionType === 'like',
      );

      const dislikes = data?.payload.filter(
        (reaction) => reaction.reactionType === 'dislike',
      );

      setIsDisliked(true);
      setIsLiked(false);

      setDislikes(dislikes?.length);
      setLikes(likes?.length);
    });
  };

  const savePost = () => {
    dispatch(
      updatePost({ postId: post.id, userId: user.id, text, profile: profile }),
    );
    setIsEditMode(false);
  };

  const onSuccess = () => {
    dispatch(getPosts(user.id));
  };

  const handleDelete = () => {
    dispatch(deletePost({ post, profile })).then(onSuccess);
  };

  const handleReply = () => {
    setReply(true);
  };

  const changeComment = (e) => {
    setContent(e.target.value);
  };

  const onDelete = (id) => {
    dispatch(deleteComment(id)).then(() =>
      dispatch(getComments(post.id)).then((data) => setComments(data.payload)),
    );
  };

  const createNewComment = () => {
    dispatch(
      createComment({
        userId: profile.id,
        content,
        postId: post.id,
        postUserId: post.userId,
      }),
    ).then(() =>
      dispatch(getComments(post.id)).then((data) => setComments(data.payload)),
    );

    setContent('');
  };

  const targetData = isUserProfile ? user : post;
  const userId = isUserProfile ? user.id : post.userId;

  const postAuthor = `${targetData.first_name} ${targetData.last_name}`;
  const userAvatar = targetData.avatar;

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span onClick={setLike}>
        {isLiked && <LikeOutlined style={{ color: '#191970' }} />}
        {!isLiked && <LikeOutlined style={{ color: 'silver' }} />}
        <span className='comment-action'>{`${likes}`}</span>
      </span>
    </Tooltip>,

    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span onClick={dislike}>
        {isDisliked && <DislikeOutlined style={{ color: '#191970' }} />}
        {!isDisliked && <DislikeOutlined style={{ color: 'silver' }} />}
        <span className='comment-action'>{`${dislikes}`}</span>
      </span>
    </Tooltip>,

    <span key='comment-basic-reply-to' onClick={handleReply}>
      Reply to
    </span>,

    <>
      {((!id && isUserProfile && !isEditMode) || profile.is_admin) && (
        <span key='comment-basic-edit' onClick={() => setIsEditMode(true)}>
          Edit
        </span>
      )}

      {((!id && isUserProfile) || profile.is_admin) && (
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

  const data = comments?.filter((comment) => comment.postId === post.id);

  return (
    <Card
      bordered={false}
      size='small'
      style={{
        margin: 26,
        backgroundColor: 'whitesmoke',
        borderRadius: 14,
      }}
      className='post'
    >
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
              autoSize={true}
              rows={1}
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

      <PostComments comment={data} onDelete={onDelete} />

      {reply && (
        <Comment
          avatar={
            <Avatar
              src={profile.avatar ? profile.avatar : NoAvatar}
              alt='Avatar'
            />
          }
          content={
            <Editor
              value={[content]}
              onChange={changeComment}
              onSubmit={createNewComment}
              user={user}
              post={post}
              comment={true}
              style={{ display: 'flex', flexDirection: 'column' }}
            />
          }
        />
      )}
    </Card>
  );
};

export default Post;
