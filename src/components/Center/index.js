import { Row, Col } from 'antd';

const Center = ({
  children,
  minHeight = '50vh',
  height = '97vh',
  width = '80vw',
}) => {
  return (
    <Row
      type='single-line'
      justify='center'
      align='middle'
      style={{ minHeight: minHeight, height: height, width: width }}
    >
      <Col>{children}</Col>
    </Row>
  );
};

export default Center;
