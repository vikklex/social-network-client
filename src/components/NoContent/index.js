import React from 'react';
import { Card, Col, Row } from 'antd';

import Meta from 'antd/lib/card/Meta';

function NoContent({ title, description, img }) {
  return (
    <Row style={{ marginTop: '5%' }}>
      <Col span={3}></Col>
      <Col span={17}>
        <Card
          hoverable
          bordered={false}
          cover={<img alt='example' src={img} className='nodata__img' />}
        >
          <h1>Oops...</h1>
          <Meta title={title} description={description} />
        </Card>
      </Col>
    </Row>
  );
}

export default NoContent;
