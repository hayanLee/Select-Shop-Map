import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from '../layouts/DefaultLayout';
import MainLayout from '../layouts/MainLayout';
import DetailPage from '../pages/DetailPage.jsx/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import SignUpPage from '../pages/SignUpPage';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [{ path: '/', element: <HomePage /> }]
      },
      { path: '/shop/:shopId', element: <DetailPage /> },
      { path: '/myPage', element: <MyPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/signUp', element: <SignUpPage /> }
    ]
  }
]);

export default router;
