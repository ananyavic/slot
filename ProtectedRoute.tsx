// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token'); // Get the token from local storage
  
  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return <>{children}</>; // Corrected closing fragment tag
};

export default ProtectedRoute;
