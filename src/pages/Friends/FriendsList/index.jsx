import { Avatar, List, Card } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import NoAvatar from 'assets/img/noavatar.png';

const FriendsList = ({ persons }) => {
  const navigate = useNavigate();

  return (
    <List
      itemLayout='horizontal'
      dataSource={persons}
      locale={{ emptyText: () => null }}
      renderItem={(person) => (
        <List.Item key={person.id}>
          <Card
            bordered={false}
            onClick={() => navigate(`/user/${person.id}`)}
            style={{ cursor: 'pointer', width: '100%' }}
          >
            <List.Item.Meta
              className=''
              avatar={<Avatar src={person.avatar ? person.avatar : NoAvatar} />}
              title={`${person.first_name} ${person.last_name}`}
              description={
                <div>
                  <div> {person.status ?? ''}</div>
                  <div> {person.city ?? ''}</div>
                  <div> {person.relations ?? ''}</div>
                </div>
              }
            />
          </Card>
        </List.Item>
      )}
    />
  );
};

export default FriendsList;
