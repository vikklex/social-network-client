import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ key, icon, link, text }) => {
  return (
    <Menu.Item key={key} icon={icon}>
      <Link to={link}>{text}</Link>
    </Menu.Item>
  );
};

export default MenuItem;
