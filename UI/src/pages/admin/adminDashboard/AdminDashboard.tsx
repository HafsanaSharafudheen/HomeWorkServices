import SideBar from "./sideBar";
import './adminDashboard.css'

const AdminDashboard: React.FC = () => {
 

  return (
      <div className="dashboardConatiner">
        <h1>Welcome to the Admin Dashboard</h1>
        {/* Add dashboard-specific content here */}
      <SideBar/>
      </div>
  );
};

export default AdminDashboard;
