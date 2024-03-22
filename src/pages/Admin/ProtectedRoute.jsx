import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/admin/auth" />;
  }

  return element;
};

export default ProtectedRoute;