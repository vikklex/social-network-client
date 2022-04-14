import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from 'antd/lib/layout/layout';

import MainPage from './pages/main/MainPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Header from './../src/components/Header/Header';

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      {token && <Header />}
      <Routes>
        <Route
          exact
          path='/'
          element={token ? <MainPage /> : <Login />}
        ></Route>

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
    </Router>
  );
}

export default App;
