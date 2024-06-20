import React, { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire('로그인을 먼저 해주세요!', '', 'warning').then(() => {
        navigate('/login', { replace: true });
      });
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return children;
  }

  return null;
};

export default PrivateRoute;
