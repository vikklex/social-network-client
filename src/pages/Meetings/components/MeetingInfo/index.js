import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Avatar, List, Card, Form, Row, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import moment from 'moment';

import { TIME_PM_FORMAT } from 'utils/Constants';
import { DATE_MOMENT_FORMAT } from 'utils/Constants';

import {
  getMeetings,
  updateMeeting,
  deleteMeeting,
} from 'redux/actions/meetingAction';

import ModalForm from 'pages/Meetings/components/ModalForm';

const MeetingInfo = ({ content, user }) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const isAuthor = content.userId === user.id;

  const participantsIds = [];
  content.participants.forEach((participant) =>
    participantsIds.push(participant.id),
  );

  const handleDelete = () => {
    dispatch(deleteMeeting(content, user.id));
  };

  const handleEdit = () => {
    setIsModalVisible(true);
  };

  useEffect(() => {
    dispatch(getMeetings(user.id));
  }, [user.id, dispatch]);

  const onFinish = (values) => {
    const data = {
      id: content.id,
      userId: user.id,
      date: content.date,
      ...values,
    };

    dispatch(updateMeeting(data));
    setIsModalVisible(false);
  };

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
        <Modal
          title='Edit Meeting'
          visible={isModalVisible}
          footer={false}
          onCancel={() => setIsModalVisible(false)}
        >
          <ModalForm
            onFinish={onFinish}
            isMainComponent={true}
            initialValue={{
              ...content,
              startTime: content?.startTime
                ? moment(content.startTime)
                : moment(),
              endTime: content?.endTime ? moment(content.endTime) : moment(),
              participants: participantsIds,
            }}
          />
        </Modal>
      </div>

      <Row>
        {isAuthor && (
          <Form style={{ display: 'flex' }}>
            <Form.Item>
              <DeleteOutlined onClick={handleDelete} />
            </Form.Item>

            <Form.Item style={{ marginLeft: 15 }}>
              <EditOutlined onClick={handleEdit} />
            </Form.Item>
          </Form>
        )}
      </Row>
    </Card>
  );
};

export default MeetingInfo;
