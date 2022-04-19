import React from 'react';
import { Navigate } from 'react-router-dom';
import { storage } from '../../storage';

export const PrivateRouter = ({ children }) => {
  const login = storage.login.Get();
  return login ? children : <Navigate to='/' />;
};

export default PrivateRouter;
