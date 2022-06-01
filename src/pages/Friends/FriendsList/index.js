import React from 'react';
import { useNavigate } from 'react-router-dom';

import { List, Card } from 'antd';

import FriendItem from '../FriendItem';

const FriendsList = ({ persons }) => {
  const navigate = useNavigate();

  return (
    <List
      itemLayout='horizontal'
      dataSource={persons}
      className='friends__list'
      locale={{ emptyText: () => null }}
      renderItem={(person) => (
        <List.Item key={person.id}>
          <Card
            bordered={false}
            size='small'
            onClick={() => navigate(`/user/${person}`)}
            style={{ cursor: 'pointer', width: '100%' }}
          >
            <List.Item
              key={person}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'unset',
                flexWrap: 'nowrap',
              }}
            >
              <FriendItem id={person} />
            </List.Item>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FriendsList;
