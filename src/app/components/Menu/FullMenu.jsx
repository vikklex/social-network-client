import React from 'react';
import { useLocation } from 'react-router-dom';

import { Menu } from 'antd';

import {
  HomeOutlined,
  UsergroupAddOutlined,
  ContactsOutlined,
  HeartOutlined,
  SettingOutlined,
  CalendarFilled,
} from '@ant-design/icons';

import 'app/components/Menu/menu.scss';
import MenuItem from 'app/components/Menu/MenuItem/MenuItem';

export const FullMenu = () => {
  const { pathname } = useLocation();

  return (
    <Menu
      style={{ width: 256 }}
      mode='vertical'
      className='navbar__list'
      selectedKeys={pathname}
    >
      <MenuItem link='/' icon={<HomeOutlined />} text='My page' />

      <MenuItem
        link='/friends'
        icon={<UsergroupAddOutlined />}
        text='My friends'
      />

      <MenuItem
        link='/posts'
        icon={<ContactsOutlined />}
        text='Posts of my friends'
      />

      <MenuItem link='/reactions' icon={<HeartOutlined />} text='Reaction' />

      <MenuItem link='/meetings' icon={<CalendarFilled />} text='Meetings' />

      <MenuItem link='/settings' icon={<SettingOutlined />} text='Settings' />
    </Menu>
  );
};
