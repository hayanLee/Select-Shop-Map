import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import DetailPage from '../pages/DetailPage.jsx/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage/MyPage.jsx';
import SignUpPage from '../pages/SignUpPage';
import PrivateRoute from '../components/PrivateRoute';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/shop/:shopId', element: <DetailPage /> },
      { path: '/myPage', element: <PrivateRoute><MyPage /></PrivateRoute> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signUp', element: <SignUpPage /> }
    ]
  }
]);

export default router;
