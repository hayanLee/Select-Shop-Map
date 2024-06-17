import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="grid-cols-main grid h-full">
      <aside className="bg-active px-4">aside</aside>
      <Outlet />
    </div>
  );
}

export default MainLayout;
