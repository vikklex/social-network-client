import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import moment from 'moment';

import { UsergroupAddOutlined } from '@ant-design/icons';
import { Card, Col, DatePicker, Divider, Row, Space, Statistic } from 'antd';

import { getUsersFromRegisterDate } from 'redux/actions/profileActions';
import UserStatistics from 'pages/Reactions/components/admin/UserStatistics';

const AdminStatistics = () => {
  const dispatch = useDispatch();

  const [dateRange, setDateRange] = useState([
    moment().subtract(20, 'days'),
    moment().add(1, 'day').endOf('day'),
  ]);

  const [usersFromRegisterDate, setUsersFromRegisterDate] = useState(null);

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

  return (
    <Card>
      <Row gutter={16}>
        <Divider>ADMIN STATISTICS</Divider>

        <Col span={16}>
          <Statistic
            title='Total number of registered users:'
            value={11}
            prefix={<UsergroupAddOutlined />}
          />
        </Col>
      </Row>
      <Row>
        <Space direction='vertical' size={12}>
          <DatePicker.RangePicker
            value={dateRange}
            onChange={(value) => setDateRange(value)}
          />
        </Space>

        <UserStatistics
          startDate={dateRange[0]}
          endDate={dateRange[1]}
          users={usersFromRegisterDate}
        />
      </Row>
    </Card>
  );
};

export default AdminStatistics;
