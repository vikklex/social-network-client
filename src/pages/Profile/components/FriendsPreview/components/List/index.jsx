import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Avatar, List } from 'antd';
import NoAvatar from 'assets/img/noavatar.png';

const FriendsPreviewList = ({ users }) => {
  const navigate = useNavigate();
  return (
    <List
      itemLayout='horizontal'
      dataSource={users}
      locale={{ emptyText: () => null }}
      renderItem={(user) => (
        <List.Item key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
          {<Avatar src={user.avatar || NoAvatar} style={{ marginRight: 10 }} />}
          {`${user.first_name} ${user.last_name}`}
        </List.Item>
      )}
    />
  );
};

export default FriendsPreviewList;
