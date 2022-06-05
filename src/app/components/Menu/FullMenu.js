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
  StockOutlined,
  MessageOutlined,
} from '@ant-design/icons';

import 'app/components/Menu/menu.scss';
import MenuItem from 'app/components/Menu/MenuItem/MenuItem';
import { useSelector } from 'react-redux';

export const FullMenu = () => {
  const { pathname } = useLocation();

  const profile = useSelector((state) => state.auth.profile);

  return (
    <Menu mode='vertical' className='navbar__list' selectedKeys={pathname}>
      <MenuItem link='/' icon={<HomeOutlined />} text='My page' />

      <MenuItem
        link='/friends'
        icon={<UsergroupAddOutlined />}
        text='My friends'
      />

      <MenuItem link='/messenger' icon={<MessageOutlined />} text='Messages' />

      <MenuItem
        link='/posts'
        icon={<ContactsOutlined />}
        text='Posts of my friends'
      />

      <MenuItem link='/reactions' icon={<HeartOutlined />} text='Reactions' />

      {profile?.is_admin && (
        <MenuItem
          link='/statistics'
          icon={<StockOutlined />}
          text='Statistics'
        />
      )}

      <MenuItem link='/meetings' icon={<CalendarFilled />} text='Meetings' />

      <MenuItem link='/settings' icon={<SettingOutlined />} text='Settings' />
    </Menu>
  );
};
