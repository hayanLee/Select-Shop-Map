import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function DefaultLayout() {
  return (
    <div className="h-screen w-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
