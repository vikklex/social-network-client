import React from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Menu } from 'antd';

import SubMenu from 'antd/lib/menu/SubMenu';

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

  const isActive = (pn) => {
    if (pn === pathname) return 'active';
  };
  return (
    <>
      <Menu style={{ width: 256 }} mode='vertical' className='navbar__list'>
        <Link to='/'>
          <SubMenu
            key='sub1'
            icon={<HomeOutlined />}
            title='My page'
            className={`${isActive('/')}`}
          ></SubMenu>
        </Link>

        <Link to='/friends'>
          <SubMenu
            key='sub2'
            icon={<UsergroupAddOutlined />}
            title='My friends'
            className={`${isActive('/friends')}`}
          ></SubMenu>
        </Link>

        <Link to='/about'>
          <SubMenu
            key='sub3'
            icon={<IdcardOutlined />}
            title='About me'
            className={`${isActive('/about')}`}
          ></SubMenu>
        </Link>

        <Link to='/posts'>
          <SubMenu
            key='sub4'
            icon={<ContactsOutlined />}
            title='Posts of my friends'
            className={`${isActive('/posts')}`}
          ></SubMenu>
        </Link>

        <Link to='/reactions'>
          <SubMenu
            key='sub5'
            icon={<HeartOutlined />}
            title='Reactions'
            className={`${isActive('/reactions')}`}
          ></SubMenu>
        </Link>

        <Link to='/meetings'>
          <SubMenu
            key='sub6'
            icon={<CalendarFilled />}
            title='Meetings'
            className={`${isActive('/meetings')}`}
          ></SubMenu>
        </Link>

        <Link to='/settings'>
          <SubMenu
            key='sub7'
            icon={<SettingOutlined />}
            title='Settings'
            className={`${isActive('/settings')}`}
          ></SubMenu>
        </Link>
      </Menu>
    </>
  );
};
