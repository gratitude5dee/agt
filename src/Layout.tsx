
import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-950 text-gray-200">
      <Sidebar />
      <main className="flex-grow p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
