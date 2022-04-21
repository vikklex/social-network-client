import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Menu } from 'antd';

import {
  HomeOutlined,
  UsergroupAddOutlined,
  IdcardOutlined,
  ContactsOutlined,
  HeartOutlined,
  SettingOutlined,
  CalendarFilled,
} from '@ant-design/icons';

import './menu.scss';
import MenuItem from './MenuItem/MenuItem';

export const FullMenu = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Menu
        style={{ width: 256 }}
        mode='vertical'
        className='navbar__list'
        selectedKeys={pathname}
      >
        <MenuItem key='sub1' icon={<HomeOutlined />} link='/' text='My page' />
        <MenuItem
          key='sub2'
          icon={<UsergroupAddOutlined />}
          link='/friends'
          text='My friends'
        />
        <MenuItem
          key='sub3'
          icon={<IdcardOutlined />}
          link='/about'
          text='About me'
        />
        <MenuItem
          key='sub4'
          icon={<ContactsOutlined />}
          link='/posts'
          text='Posts of my friends'
        />
        <MenuItem
          key='sub7'
          icon={<HeartOutlined />}
          link='/reactions'
          text='Reaction'
        />
        <MenuItem
          key='sub5'
          icon={<CalendarFilled />}
          link='/meetings'
          text='Meetings'
        />
        <MenuItem
          key='sub6'
          icon={<SettingOutlined />}
          link='/settings'
          text='Settings'
        />
      </Menu>
    </>
  );
};
