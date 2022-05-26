import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Avatar, Col, Row, Typography } from 'antd';

import { LogoutOutlined } from '@ant-design/icons';

import { logout } from 'redux/actions/authActions';
import { searchUserProfile } from 'redux/actions/profileActions';

import AutoCompleteHeader from './components/AutoComplete';
import 'app/components/Header/header.scss';

import NoAvatar from 'assets/img/noavatar.png';

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
        <Col span={6}>
          <Row justify='space-between' align='middle'>
            <Col span={6}>
              <Link to='/'>
                <Avatar
                  src={profile.avatar ? profile.avatar : NoAvatar}
                  size={64}
                  className='avatar__mini'
                />
              </Link>
            </Col>

            <Col span={18}>
              <Typography.Title level={5}>
                {profile.first_name}
              </Typography.Title>
            </Col>
          </Row>
        </Col>

        <Col span={13}>
          <AutoCompleteHeader
            search={search}
            onSearch={onSearch}
            onChange={onChange}
            onSelect={onSelect}
            searchUsers={searchUsers}
            style={{
              width: '80%',
            }}
          ></AutoCompleteHeader>
        </Col>

        <Col span={1}>
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
