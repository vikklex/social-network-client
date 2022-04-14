import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainPage from './pages/main/MainPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Header from './../src/components/Header/Header';
import { FullMenu } from './components/Menu/FullMenu';

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <Router>
      {token && <Header />}
      {token && <FullMenu />}
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
