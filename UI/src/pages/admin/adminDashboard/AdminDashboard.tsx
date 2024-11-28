import SideBar from "./sideBar";


const AdminDashboard: React.FC = () => {
 

  return (
      <div className="main-content">
          <div className="main-content">
        <h1>Welcome to the Admin Dashboard</h1>
        {/* Add dashboard-specific content here */}
      </div>
      <SideBar/>
      </div>
  );
};

export default AdminDashboard;
