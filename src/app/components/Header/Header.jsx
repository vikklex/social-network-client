import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Avatar, Badge, Col, Row } from 'antd';
import { AutoComplete } from 'antd';

import {
  MessageOutlined,
  UserOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { logout } from 'redux/actions/authActions';
import { searchUserProfile } from 'redux/actions/profileActions';

import 'app/components/Header/header.scss';

import NoAvatar from 'assets/img/noavatar.png';

const { Option } = AutoComplete;

export default function HeaderNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.profile);

  const [search, setSearch] = useState('');

  const searchUsers = useSelector((state) => state.profile.searchUsers);

  const onChange = (value) => {
    setSearch(value);
  };

  const onSearch = (value) => {
    dispatch(searchUserProfile(value, profile.id));
    setSearch(value);
  };

  const onSelect = (value, option) => {
    navigate(`/user/${option.key}`);
    setSearch('');
  };

  useEffect(() => {
    if (search && token) {
      dispatch(searchUserProfile(search, profile.id));
    }
  }, [search, token, dispatch, profile]);

  if (!profile) {
    return null;
  }

  return (
    <div>
      <Row justify='space-between' align='middle'>
        <Col span={5}></Col>
        <Col span={13}>
          <AutoComplete
            style={{
              width: 300,
            }}
            placeholder='Let search your friend'
            allowClear
            value={search}
            onSearch={onSearch}
            onChange={onChange}
            onSelect={onSelect}
          >
            {searchUsers &&
              searchUsers.map((user) => (
                <Option key={user.id} value={user.first_name}>
                  <Avatar src={user.avatar ? user.avatar : NoAvatar}></Avatar>
                  {user.first_name} {user.last_name}
                </Option>
              ))}
          </AutoComplete>
        </Col>

        <Col span={2}>
          <Link to='/'>
            <Avatar
              src={profile.avatar ? profile.avatar : NoAvatar}
              size={64}
              className='avatar__mini'
            />
          </Link>
        </Col>

        <Col span={2}>
          <h4>{profile.first_name}</h4>
        </Col>

        <Col span={2}>
          <LogoutOutlined
            className='right_icon_antd'
            onClick={() => {
              dispatch(logout());
            }}
          />
        </Col>
      </Row>
    </div>
  );
}
