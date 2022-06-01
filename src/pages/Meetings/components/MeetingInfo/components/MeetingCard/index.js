import React from 'react';

import moment from 'moment';

import { TIME_PM_FORMAT } from 'utils/Constants';
import { DATE_MOMENT_FORMAT } from 'utils/Constants';
import { Avatar, List } from 'antd';

const MeetingCard = ({ content }) => {
  
  return (
    <div className='meeting__info'>
      <p>
        <span className='personal_primary_key'>Title:</span>
        <span className='personal_primary_value'>{content.title}</span>
      </p>

      <p>
        <span className='personal_primary_key'>Description:</span>
        <span className='personal_primary_value'>{content.description}</span>
      </p>

      <p>
        <span className='personal_primary_key'>Date:</span>
        <span className='personal_primary_value'>
          {moment(content.date).format(DATE_MOMENT_FORMAT)}
        </span>
      </p>

      <p>
        <span className='personal_primary_key'>Start time:</span>
        <span className='personal_primary_value'>
          {moment(content.startTime).format(TIME_PM_FORMAT)}
        </span>
      </p>

      <p>
        <span className='personal_primary_key'>End time:</span>
        <span className='personal_primary_value'>
          {moment(content.endTime).format(TIME_PM_FORMAT)}
        </span>
      </p>

      <p>
        <span className='personal_primary_key'>Participants:</span>
        <List
          itemLayout='horizontal'
          dataSource={content.participants}
          locale={{ emptyText: () => null }}
          renderItem={(user) => (
            <List.Item key={user.id}>
              {<Avatar src={user.avatar} style={{ marginRight: 10 }} />}
              {`${user.first_name} ${user.last_name}`}
            </List.Item>
          )}
        />
      </p>
    </div>
  );
};

export default MeetingCard;
