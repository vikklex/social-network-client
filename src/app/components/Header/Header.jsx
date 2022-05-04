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
import ClientAPI from 'services/ClientAPI';
import 'app/components/Header/header.scss';

import NoAvatar from 'assets/img/noavatar.png';
const { Option } = AutoComplete;

export default function HeaderNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const profile = useSelector((state) => state.auth.profile);

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const onChange = (value) => {
    setSearch(value);
  };

  const onSearch = (value) => {
    const onSuccess = (res) => {
      setUsers(res.data.msg.users);
    };

    try {
      ClientAPI.searchUser(value).then(onSuccess);
      setSearch(value);
    } catch (error) {
      dispatch({
        type: 'ALERT',
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };

  const onSelect = (value, option) => {
    navigate(`/user/${option.key}`);
    setSearch('');
  };

  useEffect(() => {
    if (search && token) {
      ClientAPI.searchUser(search, profile.id)
        .then((res) => {
          setUsers(res.data.msg);
        })
        .catch((err) => {
          dispatch({
            type: 'ALERT',
            payload: {
              error: err.response.data.msg,
            },
          });
        });
    } else {
      setUsers([]);
    }
  }, [search, token, dispatch]);

  if (!profile) {
    return null;
  }

  return (
    <div>
      <Row justify='space-between' align='middle'>
        <Col span={5}></Col>
        <Col span={7}>
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
            {users &&
              users.map((user) => (
                <Option key={user.id} value={user.first_name}>
                  <Avatar src={user.avatar ? user.avatar : NoAvatar}></Avatar>
                  {user.first_name} {user.last_name}
                </Option>
              ))}
          </AutoComplete>
        </Col>
        <Col span={6}>
          <Row justify='center'>
            <Col span={4}>
              <Badge count={1}>
                <UserOutlined className='right_icon_antd' />
              </Badge>
            </Col>

            <Col span={4}>
              <Badge count={2}>
                <MessageOutlined className='right_icon_antd' />
              </Badge>
            </Col>

            <Col span={4}>
              <Badge count={1}>
                <NotificationOutlined className='right_icon_antd' />
              </Badge>
            </Col>
          </Row>
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
