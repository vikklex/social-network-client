import React from 'react';
import { Card, Col, Row, Switch } from 'antd';

const SettingCard = ({ title, onChange, checked }) => {
  return (
    <Card className='settings__card'>
      <Row>
        <Col span={16}>{title}</Col>
        <Col span={4}>
          <Switch onChange={onChange} defaultChecked={checked} />
        </Col>
      </Row>
    </Card>
  );
};

export default SettingCard;
