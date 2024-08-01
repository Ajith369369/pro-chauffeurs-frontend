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

// Explanation:
// constants.js: Defines the admin user credentials.
// Login Component: Checks if the login credentials match either a registered user or the designated admin user. If the admin logs in, they are redirected to the admin page.
// Register Component: Allows users to register (the admin cannot register as a regular user).
// PrivateRoute Component: Ensures that only the designated admin user can access the admin page. If a non-admin user tries to access the admin page, they are redirected to the home page.
// With these changes, only the specified admin user can access the admin page, while other registered users can still log in and access non-admin parts of the application.