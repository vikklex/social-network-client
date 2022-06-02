import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';

const MenuItem = ({ link, icon, text }) => {
  return (
    <Menu.Item key={link} icon={icon}>
      <Link to={link}>{text}</Link>
    </Menu.Item>
  );
};

export default MenuItem;
