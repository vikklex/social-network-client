import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import moment from 'moment';

import { Card, Col, DatePicker, Divider, Progress, Row, Space } from 'antd';

import {
  getUsersFromRegisterDate,
  getAllUsers,
} from 'redux/actions/profileActions';
import UserStatistics from './components/UserStatistics';
import { useSelector } from 'react-redux';

const Statistics = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.auth.profile);

  const [dateRange, setDateRange] = useState([
    moment().subtract(20, 'days'),
    moment().add(1, 'day').endOf('day'),
  ]);

  const [usersFromRegisterDate, setUsersFromRegisterDate] = useState(null);

  const [totalUserNumber, setTotalUserNumber] = useState(0);

  useEffect(() => {
    dispatch(
      getUsersFromRegisterDate({
        startDate: dateRange[0],
        endDate: dateRange[1],
      }),
    ).then((data) => {
      setUsersFromRegisterDate(data.payload);
    });
  }, [dispatch, dateRange]);

  useEffect(() => {
    dispatch(getAllUsers(profile)).then((data) =>
      setTotalUserNumber(data.payload),
    );
  }, []);

  return (
    <Card>
      <Divider>ADMIN STATISTICS</Divider>

      <Divider style={{ marginTop: '10%', marginBottom: '5%' }}>
        General information about registrated users:
      </Divider>
      <Row>
        <Col span={8}>
          <Row justify='center' style={{ marginBottom: 10 }}>
            {totalUserNumber.length} users have registered in all time
          </Row>
          <Row justify='center'>
            <Progress
              type='circle'
              percent={totalUserNumber.length}
              format={(percent) => `${percent} Users`}
            />
          </Row>
        </Col>

        <Col span={8}>
          <Row justify='center' style={{ marginBottom: 10 }}>
            {totalUserNumber.length} users have friends or followings
          </Row>
          <Row justify='center'>
            <Progress percent={60} success={{ percent: 30 }} type='dashboard' />
          </Row>
        </Col>

        <Col span={8}>
          <Row justify='center' style={{ marginBottom: 10 }}>
            {totalUserNumber.length} users have registered in all time
          </Row>
          <Row justify='center'>
            <Progress type='circle' percent={70} />
          </Row>
        </Col>
      </Row>

      <Row>
        <Divider style={{ marginTop: '10%', marginBottom: '5%' }}>
          General information about users:
        </Divider>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker
            value={dateRange}
            onChange={(value) => setDateRange(value)}
          />
        </Space>

        {
          <UserStatistics
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            users={usersFromRegisterDate}
          />
        }
      </Row>
    </Card>
  );
};

export default Statistics;
