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
        <Menu.Item key='sub1' icon={<HomeOutlined />}>
          <Link to='/'>
            <span>My Page</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='sub2' icon={<UsergroupAddOutlined />}>
          <Link to='/friends'>
            <span>My friends</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='sub3' icon={<IdcardOutlined />}>
          <Link to='/about'>
            <span>About me</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='sub4' icon={<ContactsOutlined />}>
          <Link to='/posts'>
            <span>Posts of my friends</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='sub5' icon={<HeartOutlined />}>
          <Link to='/reactions'>
            <span>Reactions</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='sub6' icon={<CalendarFilled />}>
          <Link to='/meetings'>
            <span>Meetings</span>
          </Link>
        </Menu.Item>

        <Menu.Item key='sub7' icon={<SettingOutlined />}>
          <Link to='/settings'>
            <span>Settings</span>
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};
