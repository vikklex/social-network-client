import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';
import HeaderNav from './components/Header/Header';
import { FullMenu } from './components/Menu/FullMenu';
import PrivateRoute from '../components/PrivateRoute';
import EditProfile from '../pages/Edit';

import { getUserProfile } from '../redux/actions/authActions';

import jwt_decode from 'jwt-decode';

const { Header, Sider, Content } = Layout;

function App() {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(getUserProfile({ id: jwt_decode(token).id }));
    }
  }, [dispatch, token]);

  return (
    <Router>
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
            <Route path='/' element={token ? <Profile /> : <Login />}></Route>

            <Route exact path='/login' element={<Login />} />

            <Route exact path='/register' element={<Register />} />

            <Route exact path='/user/:id' element={<PrivateRoute />}>
              <Route exact path='/user/:id' element={<Profile />} />
            </Route>

            <Route exact path='/edit' element={<PrivateRoute />}>
              <Route exact path='/edit' element={<EditProfile />} />
            </Route>
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
