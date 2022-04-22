import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Comment, Image, Tooltip, List } from 'antd';
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
import { getOneComment } from '../../../../redux/actions/commentActions';

export default function Posts() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.post.post);
  const user = useSelector((state) => state.profile.user);
  const { id } = useParams();

  posts.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const actions = [
    <Tooltip key='comment-basic-like' title='Like'>
      <span>
        {action === 'liked' ? <LikeFilled /> : <LikeOutlined />}
        <span className='comment-action'>{likes}</span>
      </span>
    </Tooltip>,

    <Tooltip key='comment-basic-dislike' title='Dislike'>
      {action === 'disliked' ? <DislikeFilled /> : <DislikeOutlined />}
      <span className='comment-action'>{dislikes}</span>
    </Tooltip>,

    <span key='comment-basic-reply-to'>Reply to</span>,
  ];

  const Reply = ({ children, content }) => {
    return (
      <Comment
        author={<a>Han Solo</a>}
        avatar={
          <Avatar src='https://joeschmoe.io/api/v1/random' alt='Han Solo' />
        }
        content={<p>{content}</p>}
      >
        {children}
      </Comment>
    );
  };

  return (
    <List
      itemLayout='horizontal'
      dataSource={posts}
      locale={{ emptyText: () => null }}
      renderItem={(post) => (
        <List.Item key={post._id}>
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
                <p>{post.desc}</p>
                <List
                  itemLayout='horizontal'
                  dataSource={post.comments}
                  locale={{ emptyText: () => null }}
                  renderItem={(comment) => (
                    <List.Item>
                      <Reply content={comment} />
                    </List.Item>
                  )}
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
        </List.Item>
      )}
    />
  );
}
/*   <List
                  itemLayout='horizontal'
                  dataSource={post.comments}
                  renderItem={(comment) => (
                    <List.Item key={comment._id}>
                      <Reply />
                    </List.Item>
                  )} */
// {post.comments &&
//post.comments.map((comment) => comment && <Reply />)}
