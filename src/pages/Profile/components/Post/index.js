import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Comment, Image, List, Input, Tooltip } from 'antd';

import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';

import moment from 'moment';

import NoAvatar from './../../../../assets/img/noavatar.png';
import { deletePost, updatePost } from '../../../../redux/actions/postActions';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;

const Post = ({ post }) => {
  const { id } = useParams();
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
      {!isEditMode && !id && (
        <span key='comment-basic-edit' onClick={() => setIsEditMode(true)}>
          Edit
        </span>
      )}
      {!id && (
        <span key='comment-basic-delete' onClick={handleDelete}>
          Delete
        </span>
      )}
    </>,

    <>
      {isEditMode && (
        <span key='comment-basic-save' onClick={savePost}>
          Save
        </span>
      )}
    </>,
  ];

  return (
    <>
      <Comment
        actions={actions}
        author={
          <p>
            {user.first_name} {user.last_name}
          </p>
        }
        avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
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
    </>
  );
};

export default Post;
