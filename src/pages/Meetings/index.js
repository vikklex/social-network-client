import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { Calendar, Modal, Tabs } from 'antd';

import { createMeeting, getMeetings } from 'redux/actions/meetingAction';

import MeetingInfo from 'pages/Meetings/components/MeetingInfo';
import ModalForm from 'pages/Meetings/components/ModalForm';
import DateCell from 'pages/Meetings/components/DateCell';
import MonthCell from 'pages/Meetings/components/MonthCell';

import { DATE_FULL_FORMAT } from 'utils/Constants';

import './meetings.scss';

const { TabPane } = Tabs;

const Meetings = () => {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(moment());
  const [cellDate, setCellDate] = useState(moment());

  const profile = useSelector((state) => state.auth.profile);
  const meetings = useSelector((state) => state.meeting.meetings);

  useEffect(() => {
    dispatch(getMeetings(profile.id));
  }, [profile.id, dispatch]);

  const dateCellRender = (value) => {
    return <DateCell value={value} meetings={meetings} onSelect={onSelect} />;
  };

  const monthCellRender = (value) => {
    return <MonthCell value={value} meetings={meetings} />;
  };

  const onChange = (date) => {
    setCurrentDate(date);
  };

  const dateContent = meetings?.filter(
    (meeting) =>
      currentDate.format(DATE_FULL_FORMAT) ===
      moment(meeting?.date).format(DATE_FULL_FORMAT),
  );

  const onSelect = (cellDate) => {
    setVisible(true);
    setCellDate(cellDate);
  };

  const onFinish = (values) => {
    const data = {
      userId: profile.id,
      date: cellDate,
      ...values,
    };

    dispatch(createMeeting(data));
    setVisible(false);
  };

  return (
    <>
      <Calendar
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
        onChange={onChange}
      />

      <Modal
        centered
        visible={visible}
        footer={null}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      >
        <Tabs defaultActiveKey='1'>
          <TabPane tab='New meeting' key='1'>
            <ModalForm onFinish={onFinish} isMainComponent={true} />
          </TabPane>

          <TabPane tab='Show meetings' key='2'>
            {dateContent?.map((content) => (
              <MeetingInfo content={content} user={profile} key={content.id} />
            ))}
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default Meetings;
