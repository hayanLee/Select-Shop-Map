import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const userInfo = localStorage.getItem('userInfo');

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default PrivateRoute;
