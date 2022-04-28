import { Avatar, List, Card } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import NoAvatar from './../../../assets/img/noavatar.png';

function FriendsList({ persons }) {
  const navigate = useNavigate();

  return (
    <>
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
                avatar={
                  <Avatar src={person.avatar ? person.avatar : NoAvatar} />
                }
                title={
                  <div>
                    <span>{person.first_name}</span>
                    <span> </span>
                    <span>{person.last_name}</span>
                  </div>
                }
                description={
                  <div>
                    <div>
                      <div> {person.status ? person.status : ''}</div>
                      <div> {person.city ? person.city : ''}</div>
                      <div> {person.relations ? person.relations : ''}</div>
                    </div>
                  </div>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
}

export default FriendsList;
