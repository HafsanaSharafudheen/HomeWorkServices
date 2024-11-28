import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCogs,
  FaTags,
} from "react-icons/fa";

const SideBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate(); // Initialize the navigation hook

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <button className="collapse-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
            ☰
          </button>
        </div>
        <ul className="nav-links">
          <li onClick={() => navigate("/admin/dashboard")} className="nav-item">
            <FaTachometerAlt className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Dashboard</span>}
          </li>
          <li onClick={() => navigate("/admin/bookings")} className="nav-item">
            <FaCalendarAlt className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Bookings</span>}
          </li>
          <li onClick={() => navigate("/admin/users")} className="nav-item">
            <FaUsers className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Users</span>}
          </li>
          <li onClick={() => navigate("/admin/service-providers")} className="nav-item">
            <FaCogs className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Service Providers</span>}
          </li>
          <li onClick={() => navigate("/adminCategories")} className="nav-item">
            <FaTags className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Categories</span>}
          </li>
        </ul>
      </div>

    
    </div>
  );
};

export default SideBar;
