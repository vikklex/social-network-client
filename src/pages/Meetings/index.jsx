import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import {
  Calendar,
  Input,
  Form,
  Badge,
  Modal,
  Button,
  Select,
  TimePicker,
  Avatar,
  Tabs,
} from 'antd';

import { getMeetings, createMeeting } from 'redux/actions/meetingAction';

import MeetingInfo from 'pages/Meetings/components/MeetingInfo';

import { DATE_FULL_FORMAT } from 'utils/Constants';
import { TIME_FORMAT } from 'utils/Constants';
import './meetings.scss';

const { TabPane } = Tabs;

const Meetings = () => {
  const dispatch = useDispatch();

  const [currentDate, setCurrentDate] = useState(moment());

  const profile = useSelector((state) => state.auth.profile);
  const meetings = useSelector((state) => state.meeting.meetings);
  const friends = useSelector((state) => state.auth.profile.followings);

  useEffect(() => {
    dispatch(getMeetings(profile.id));
  }, [profile.id, dispatch]);

  const getListData = (date) => {
    const data = meetings.filter(
      (meeting) =>
        date.format(DATE_FULL_FORMAT) ===
        moment(meeting.date).format(DATE_FULL_FORMAT),
    );

    return data.map((meeting) => {
      return {
        type: 'success',
        content: meeting.title,
      };
    });
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);

    return (
      <ul
        className='events'
        onClick={() => onSelect(value)}
        style={{ height: '100%' }}
      >
        {listData.map((item, index) => (
          <li key={index}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className='notes-month'>
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
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
    const onFinish = (values) => {
      const data = {
        userId: profile.id,
        date: cellDate,
        ...values,
      };

      dispatch(createMeeting(data));
    };

    Modal.info({
      content: (
        <Tabs defaultActiveKey='1'>
          <TabPane tab='New meeting' key='1'>
            <Form
              onFinish={onFinish}
              name='basic'
              labelCol={{
                span: 7,
              }}
            >
              <Form.Item label='Title' name='title'>
                <Input />
              </Form.Item>

              <Form.Item label='Description' name='description'>
                <Input />
              </Form.Item>

              <Form.Item label='Participants' name='participants'>
                <Select>
                  {friends.map((friend) => (
                    <Select.Option value={friend.id} key={friend.id}>
                      <Avatar src={friend.avatar} style={{ marginRight: 4 }} />
                      {`${friend.first_name} ${friend.last_name}`}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label='Start time:' name='startTime'>
                <TimePicker format={TIME_FORMAT} />
              </Form.Item>

              <Form.Item label='End time:' name='endTime'>
                <TimePicker format={TIME_FORMAT} />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Set meeting
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab='Show meetings' key='2'>
            {dateContent?.map((content) => (
              <MeetingInfo content={content} user={profile} key={content.id} />
            ))}
          </TabPane>
        </Tabs>
      ),
    });
  };

  return (
    <Calendar
      dateCellRender={dateCellRender}
      monthCellRender={monthCellRender}
      onChange={onChange}
    />
  );
};

export default Meetings;
