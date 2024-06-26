import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import DefaultLayout from '../layouts/DefaultLayout';
import DetailPage from '../pages/DetailPage.jsx/DetailPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage/MyPage.jsx';
import SignUpPage from '../pages/SignUpPage';

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/shop/:shopId', element: <DetailPage /> },
      {
        path: '/myPage',
        element: <PrivateRoute element={<MyPage />} />
      },
      { path: '/login', element: <LoginPage /> },
      { path: '/signUp', element: <SignUpPage /> }
    ]
  }
]);

export default router;
