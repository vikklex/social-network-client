import { Spin } from 'antd';

import { LoadingOutlined } from '@ant-design/icons';

const Spinner = (props) => {
  const icon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return <Spin size='large' indicator={icon} delay={250} {...props} />;
};

export default Spinner;
