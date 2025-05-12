import React, { useEffect } from 'react';
import { useAuthStore } from '../store';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!user || !isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }

  return children;
};

export default ProtectedRoutes;
