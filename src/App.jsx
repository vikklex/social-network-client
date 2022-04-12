import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MainPage from './pages/main/MainPage';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
  const { auth } = useSelector((state) => state);

  return (
    <div className='app-wrapper'>
      <Router>
        <Routes>
          <Route
            exact
            path='/'
            element={auth.token ? <MainPage /> : <Login />}
          ></Route>

          <Route
            exact
            path='/login'
            element={auth.token ? <MainPage /> : <Login />}
          ></Route>

          <Route
            exact
            path='/register'
            element={auth.token ? <MainPage /> : <Register />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
