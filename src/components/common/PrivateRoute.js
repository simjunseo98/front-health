import React from 'react';
import { Navigate } from 'react-router-dom';
//로그인되지 않은 사용자를 막기위한 컴포넌트
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
