import { useState } from "react";
import ProviderSidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState<string>("Dashboard");

  // Function to render content based on the active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "Dashboard":
        return (
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="mt-4 text-gray-700">Welcome to your dashboard.</p>
          </div>
        );
      case "User":
        return (
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="mt-4 text-gray-700">Manage your users here.</p>
          </div>
        );
      case "Messages":
        return (
          <div>
            <h1 className="text-3xl font-bold">Messages</h1>
            <p className="mt-4 text-gray-700">Check your messages here.</p>
          </div>
        );
      case "Settings":
        return (
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="mt-4 text-gray-700">Adjust your settings here.</p>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold">Welcome</h1>
            <p className="mt-4 text-gray-700">Please select a menu item.</p>
          </div>
        );
    }
  };

  return (
     <div className="d-flex h-screen bg-gray-100">
     <ProviderSidebar  />
     <div className="w-100 p-6 bg-white flex-1">{renderContent()}</div>
   </div>
  );
};

export default Dashboard;
