import React from 'react';
import { Navigate } from 'react-router-dom';
import { ADMIN_USER } from '../constants';

const PrivateRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (currentUser.username !== ADMIN_USER.username) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
