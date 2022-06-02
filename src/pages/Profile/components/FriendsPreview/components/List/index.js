import React from 'react';

import { useNavigate } from 'react-router-dom';

import { List } from 'antd';

import FriendPreview from 'pages/Profile/components/FriendsPreview/components/FriendPreview';

const FriendsPreviewList = ({ users }) => {
  const navigate = useNavigate();

  return (
    <List
      itemLayout='horizontal'
      dataSource={users}
      locale={{ emptyText: () => null }}
      renderItem={(id) => (
        <List.Item
          key={id}
          onClick={() => navigate(`/user/${id}`)}
          style={{ cursor: 'pointer' }}
        >
          <FriendPreview id={id} />
        </List.Item>
      )}
    />
  );
};

export default FriendsPreviewList;
