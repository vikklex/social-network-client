import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import moment from 'moment';

import { Card, Row, Modal } from 'antd';

import {
  getMeetings,
  updateMeeting,
  deleteMeeting,
} from 'redux/actions/meetingAction';

import ModalForm from 'pages/Meetings/components/ModalForm';
import MeetingCard from 'pages/Meetings/components/MeetingInfo/components/MeetingCard';
import MeetingForm from 'pages/Meetings/components/MeetingInfo/components/MeetingForm';

const MeetingInfo = ({ content, user }) => {
  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const isAuthor = content.userId === user.id;

  const participantsIds = [];

  content.participants.forEach((participant) =>
    participantsIds.push(participant.id),
  );

  const handleDelete = () => {
    dispatch(deleteMeeting(content));
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

    dispatch(updateMeeting(data)).then((data) =>
      dispatch(getMeetings(data.payload.userId)),
    );
    setIsModalVisible(false);
  };

  return (
    <Card>
      <div
        className='site-card-border-less-wrapper profile'
        style={{ marginTop: 15 }}
      >
        <MeetingCard content={content} />

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
          <MeetingForm handleDelete={handleDelete} handleEdit={handleEdit} />
        )}
      </Row>
    </Card>
  );
};

export default MeetingInfo;
