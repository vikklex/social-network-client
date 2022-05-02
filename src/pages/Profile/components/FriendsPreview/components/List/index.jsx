import React from 'react';
import { Avatar, List } from 'antd';
import { useNavigate } from 'react-router-dom';

const FriendsPreviewList = ({ users }) => {
  const navigate = useNavigate();
  return (
    <List
      itemLayout='horizontal'
      dataSource={users}
      locale={{ emptyText: () => null }}
      renderItem={(user) => (
        <List.Item key={user.id} onClick={() => navigate(`/user/${user.id}`)}>
          {<Avatar src={user.avatar} style={{ marginRight: 10 }} />}
          {`${user.first_name} ${user.last_name}`}
        </List.Item>
      )}
    />
  );
};

export default FriendsPreviewList;
