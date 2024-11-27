import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, setError } = useContext(AuthContext);

  // ตรวจสอบว่าผู้ใช้ล็อกอินหรือยัง
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ตรวจสอบสิทธิ์ของผู้ใช้
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    setError('You do not have permission to access this page.');
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRoute;
