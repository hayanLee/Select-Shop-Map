import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      Swal.fire('로그인되지 않은 사용자입니다!', '로그인부터 해주세요', 'warning').then(() => {
        setShowAlert(true);
      });
    }
  }, [isAuthenticated]);

  if (showAlert) {
    return <Navigate to="/login" />;
  }

  return isAuthenticated ? children : null;
};

export default PrivateRoute;
