import React, { useEffect } from 'react';

import { Avatar, List, Card, Form } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import moment from 'moment';

import { TIME_PM_FORMAT } from 'utils/Constants';
import { DATE_MOMENT_FORMAT } from 'utils/Constants';
import { useDispatch } from 'react-redux';
import { deleteMeeting } from 'redux/actions/meetingAction';
import { getMeetings } from '../../../../redux/actions/meetingAction';

const MeetingInfo = ({ content, user }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteMeeting(content, user.id));
  };

  useEffect(() => {
    dispatch(getMeetings(user.id));
  }, [user.id, dispatch]);

  return (
    <Card>
      <div
        className='site-card-border-less-wrapper profile'
        style={{ marginTop: 15 }}
      >
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
      <Form>
        <Form.Item>
          <DeleteOutlined onClick={handleClick} />
        </Form.Item>
      </Form>
    </Card>
  );
};

export default MeetingInfo;
