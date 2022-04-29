import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Comment, Image, List, Input, Tooltip, Card } from 'antd';

import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import moment from 'moment';

import NoAvatar from './../../../../assets/img/noavatar.png';
import { deletePost, updatePost } from '../../../../redux/actions/postActions';
import { useNavigate, useParams } from 'react-router-dom';

const { TextArea } = Input;

const Post = ({ post, isUserProfile }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.profile.user);

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const [text, setText] = useState(post.desc);

  const savePost = () => {
    dispatch(updatePost(post.id, user.id, text));
    setIsEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deletePost(post, user.id));
  };

  const postAuthor = isUserProfile
    ? `${user.first_name} ${user.last_name}`
    : `${post.first_name} ${post.last_name}`;

  const userAvatar = isUserProfile ? user.avatar : post.avatar;
  const userId = isUserProfile ? user.id : post.userId;

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span>
        <LikeOutlined />
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,

    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <DislikeOutlined />
      <span className='comment-action'>{dislikes}</span>
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
    <Card
      bordered={false}
      onClick={() => {
        !isUserProfile && navigate(`/user/${userId}`);
      }}
    >
      <Comment
        actions={actions}
        author={<p>{postAuthor}</p>}
        avatar={<Avatar src={userAvatar ? userAvatar : NoAvatar} />}
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
          <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(post.createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </Card>
  );
};

export default Post;
