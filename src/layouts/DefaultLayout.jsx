import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function DefaultLayout() {
  return (
    <div className="w-scree h-screen">
      <Header />
      <div className="h-full px-64">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
