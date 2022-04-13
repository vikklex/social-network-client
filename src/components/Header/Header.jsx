import { useDispatch, useSelector } from 'react-redux';

import {
  MessageOutlined,
  UserOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Badge, Col, Input, Row } from 'antd';
import { Layout } from 'antd';

import './header.scss';
import { logout } from './../../redux/actions/authActions';
import { useEffect, useState } from 'react';
import ClientAPI from '../../utils/ClientAPI';

import { Space } from 'antd';
const { Search } = Input;
const { Header } = Layout;

//import { UserCard } from '../userCard/userCard';
//import Avatar from '../avatar/Avatar';

export default function HeaderNav() {
  const pf = process.env.REACT_APP_PUBLIC_FOLDER;

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  const onSearch = (value) => {
    const onSuccess = (res) => {
      setUsers(res.data.msg.users);
    };
    try {
      const res = ClientAPI.getData(`search/search?username=${value}`, token);
      res.then(onSuccess);
    } catch (error) {
      dispatch({
        type: 'ALERT',
        payload: {
          error: error.response.data.msg,
        },
      });
    }
  };
  console.log(users);
  /* useEffect(() => {
    if (token) {
      ClientAPI.getData(`search/search?username=${search}`, token)
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
  }, [search, token, dispatch]);*/

  return (
    <Layout>
      <Header>
        <Row justify='center' align='middle'>
          <Col span={5}>
            <Avatar
              size={64}
              src={pf + '/img/mini.jpg'}
              className='avatar__mini'
            />
          </Col>
          <Col span={7}>
            <Input.Group compact>
              <Input.Search
                allowClear
                style={{ width: '100%' }}
                placeholder='Let search your friend'
                onSearch={onSearch}
              />
            </Input.Group>
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
            <Avatar
              size={64}
              src={pf + '/img/mini.jpg'}
              className='avatar__mini'
            />
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
      </Header>
    </Layout>
  );
}
