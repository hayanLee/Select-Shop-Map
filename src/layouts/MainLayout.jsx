import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="grid-cols-main grid h-full">
      <aside className="bg-yellow-200">aside</aside>
      <Outlet />
    </div>
  );
}

export default MainLayout;
