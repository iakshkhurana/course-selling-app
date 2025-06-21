import { useState } from "react";
import Sidebar from "./components/sidebar";
import Navbar from "./components/Navbar-Component";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#2c3e50]">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1">
        <Navbar onMenuClick={toggleSidebar} />
        <div className="overflow-auto bg-[#34495e] flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
