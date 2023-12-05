// File: ProtectedRoute.tsx

import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user details are available in localStorage
    const userData = localStorage.getItem('userData');

    if (!userData) {
      // Redirect to the first page with a message
      alert('Please enter your details before accessing this page.');
      navigate('/');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default ProtectedRoute;
