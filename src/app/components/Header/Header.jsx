import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Avatar, Badge, Col, Input, Row, Menu } from 'antd';
import {
  MessageOutlined,
  UserOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

import { logout } from './../../../redux/actions/authActions';
import ClientAPI from './../../../utils/ClientAPI';
import './header.scss';

import NoAvatar from './../../../assets/img/noavatar.png';

export default function HeaderNav() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const onChange = (event) => {
    setSearch(event.target.value);
  };

  const onSearch = (value) => {
    const onSuccess = (res) => {
      setUsers(res.data.msg.users);
    };
    try {
      const res = ClientAPI.searchUser(value);
      res.then(onSuccess);
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

  useEffect(() => {
    if (search && token) {
      ClientAPI.searchUser(search)
        .then((res) => {
          setUsers(res.data.msg.users);
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

  return (
    <div>
      <Row justify='space-between' align='middle'>
        <Col span={5}></Col>
        <Col span={7}>
          <Input.Group compact className='search__group'>
            <Input.Search
              allowClear
              style={{ width: '100%' }}
              value={search}
              placeholder='Let search your friend'
              onSearch={onSearch}
              onChange={onChange}
            />
          </Input.Group>

          {search && (
            <Menu className='search_area' style={{ zIndex: 1 }}>
              {users.map((user) => (
                <Menu.Item key={user._id}>
                  <Link to={`/user/${user._id}`} key={user._id}></Link>
                  <Avatar src={user.avatar ? user.avatar : NoAvatar}></Avatar>
                  {user.first_name} {user.last_name}
                </Menu.Item>
              ))}
            </Menu>
          )}
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
              src={user.avatar ? user.avatar : NoAvatar}
              size={64}
              className='avatar__mini'
            />
          </Link>
        </Col>

        <Col span={2}>
          <h4>{user.first_name}</h4>
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
