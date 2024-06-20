import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function DefaultLayout() {
  return (
    <div className="font-NexonGothic h-screen w-full">
      <Header />
      <div className="h-full sm:px-11 xl:px-64">
        <Outlet />
      </div>
    </div>
  );
}

export default DefaultLayout;
