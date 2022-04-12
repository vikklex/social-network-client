import { Row, Col } from 'antd';

const Center = ({ children, minHeight = '50vh', height = '100vh' }) => {
  return (
    <Row
      type='single-line'
      justify='center'
      align='middle'
      style={{ minHeight: minHeight, height: height }}
    >
      <Col>{children}</Col>
    </Row>
  );
};

export default Center;
