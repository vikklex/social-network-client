import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import jwt_decode from 'jwt-decode';

import { Avatar, Col, Row, Typography } from 'antd';

import { LogoutOutlined } from '@ant-design/icons';

import { logout } from 'redux/slices/authSlice';

import { searchUser } from 'redux/actions/profileActions';
import { getProfile } from 'redux/actions/authActions';

import AutoCompleteHeader from './components/AutoComplete';

import 'app/components/Header/header.scss';
import NoAvatar from 'assets/img/noavatar.png';

const HeaderNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    dispatch(getProfile(jwt_decode(token).id));
  }, [dispatch, token]);

  const profile = useSelector((state) => state.auth.profile);

  const [search, setSearch] = useState('');

  const searchUsers = useSelector((state) => state.profile.searchUsers);

  const onChange = (value) => {
    setSearch(value);
  };

  const onSearch = (value) => {
    dispatch(searchUser({ value: value, id: profile.id }));
    setSearch(value);
  };

  const onSelect = (value, option) => {
    navigate(`/user/${option.key}`);
    setSearch('');
  };

  useEffect(() => {
    if (search && token) {
      dispatch(searchUser(search, profile.id));
    }
  }, [search, token, dispatch, profile]);

  const onLogout = () => {
    dispatch(logout());
  };

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
            onClick={onLogout}
            data-testid='logout_button'
          />
        </Col>
      </Row>
    </div>
  );
};

export default HeaderNav;
