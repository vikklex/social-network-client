import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';

import MainPage from './pages/Main/MainPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import HeaderNav from './../src/components/Header/Header';
import { FullMenu } from './components/Menu/FullMenu';
import EditProfile from './pages/Edit/EditProfile';

const { Header, Sider, Content } = Layout;

function App() {
  const token = useSelector((state) => state.auth.token);

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
            <Route
              path='/user/:id'
              element={token ? <MainPage /> : <Login />}
            ></Route>
            <Route path='/' element={token ? <MainPage /> : <Login />}></Route>
            <Route path='/edit' element={token && <EditProfile />}></Route>

            <Route
              exact
              path='/login'
              element={token ? <MainPage /> : <Login />}
            ></Route>

            <Route
              exact
              path='/register'
              element={token ? <MainPage /> : <Register />}
            ></Route>
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
