import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';

import Login from 'pages/Login';
import Register from 'pages/Register';
import Profile from 'pages/Profile';
import EditProfile from 'pages/EditProfile';
import FriendsPosts from 'pages/FriendsPosts';
import Friends from 'pages/Friends';
import Meetings from 'pages/Meetings';
import Settings from 'pages/Settings';
import Reactions from 'pages/Reactions';
import Statistics from 'pages/Statistics';

import HeaderNav from 'app/components/Header/Header';
import { FullMenu } from 'app/components/Menu/FullMenu';
import PrivateRoute from 'components/PrivateRoute';

import { getProfile } from 'redux/actions/authActions';

import jwt_decode from 'jwt-decode';

const { Header, Sider, Content } = Layout;

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (token) {
      const onSuccess = () => {
        setIsReady(true);
      };

      dispatch(getProfile(jwt_decode(token).id)).then(onSuccess);
    } else {
      setIsReady(true);
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Layout className='layout'>
        {token && (
          <Header>
            <HeaderNav />
          </Header>
        )}

        <Layout>
          {token && (
            <Sider>
              <FullMenu />
            </Sider>
          )}

          <Content>
            <Routes>
              {isReady && (
                <>
                  <Route
                    path='/'
                    element={token ? <Profile /> : <Login />}
                  ></Route>

                  <Route exact path='/login' element={<Login />} />

                  <Route exact path='/register' element={<Register />} />

                  <Route exact path='/user/:id' element={<PrivateRoute />}>
                    <Route exact path='/user/:id' element={<Profile />} />
                  </Route>

                  <Route exact path='/posts' element={<PrivateRoute />}>
                    <Route exact path='/posts' element={<FriendsPosts />} />
                  </Route>

                  <Route exact path='/friends' element={<PrivateRoute />}>
                    <Route exact path='/friends' element={<Friends />} />
                  </Route>

                  <Route exact path='/reactions' element={<PrivateRoute />}>
                    <Route exact path='/reactions' element={<Reactions />} />
                  </Route>

                  <Route exact path='/statistics' element={<PrivateRoute />}>
                    <Route exact path='/statistics' element={<Statistics />} />
                  </Route>

                  <Route exact path='/edit' element={<PrivateRoute />}>
                    <Route exact path='/edit' element={<EditProfile />} />
                  </Route>

                  <Route exact path='/meetings' element={<PrivateRoute />}>
                    <Route exact path='/meetings' element={<Meetings />} />
                  </Route>

                  <Route exact path='/settings' element={<PrivateRoute />}>
                    <Route exact path='/settings' element={<Settings />} />
                  </Route>
                </>
              )}
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
