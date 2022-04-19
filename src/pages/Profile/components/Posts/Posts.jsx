import React from 'react';
import { createElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Comment, Tooltip } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from '@ant-design/icons';

import moment from 'moment';

import './posts.scss';
import NoAvatar from './../../../../assets/img/noavatar.png';

export default function Posts() {
  const posts = useSelector((state) => state.post.post);

  const users = useSelector((state) => state.profile.users);

  const { id } = useParams();

  const searchUser = users.filter((user) => user._id === id)[0];

  const authUser = useSelector((state) => state.auth.user);

  const user = !searchUser ? authUser : searchUser;

  posts.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,

    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span>
        {React.createElement(
          action === 'disliked' ? DislikeFilled : DislikeOutlined,
        )}
        <span className='comment-action'>{dislikes}</span>
      </span>
    </Tooltip>,

    <span key='comment-basic-reply-to'>Reply to</span>,
  ];
  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <Comment
            key={post._id}
            actions={actions}
            author={
              <p>
                {user.first_name} {user.last_name}
              </p>
            }
            avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
            content={<p>{post.desc}</p>}
            datetime={
              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                <span>{moment(post.createdAt).fromNow()}</span>
              </Tooltip>
            }
          />
        ))}
    </>
  );
}
