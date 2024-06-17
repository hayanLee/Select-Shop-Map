import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function DefaultLayout() {
  return (
    <div className="h-screen w-full min-w-80 bg-violet-300">
      <Header />
      <Outlet />
    </div>
  );
}

export default DefaultLayout;
