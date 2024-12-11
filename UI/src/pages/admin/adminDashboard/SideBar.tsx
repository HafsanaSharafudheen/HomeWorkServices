import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCogs,
  FaTags,
} from "react-icons/fa";
import "./AdminDashboard.css";

const SideBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <button
            className="collapse-toggle"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            ☰
          </button>
        </div>
        <ul className="nav-links">
          <li
            onClick={() => navigate("/adminDashboard")}
            className="nav-item"
            {...(isCollapsed && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Dashboard",
            })}
          >
            <FaTachometerAlt className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Dashboard</span>}
          </li>
          <li
            onClick={() => navigate("/admin/bookings")}
            className="nav-item"
            {...(isCollapsed && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Bookings",
            })}
          >
            <FaCalendarAlt className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Bookings</span>}
          </li>
          <li
            onClick={() => navigate("/adminUsers")}
            className="nav-item"
            {...(isCollapsed && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Users",
            })}
          >
            <FaUsers className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Users</span>}
          </li>
          <li
            onClick={() => navigate("/adminServiceProviders")}
            className="nav-item"
            {...(isCollapsed && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Service Providers",
            })}
          >
            <FaCogs className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Service Providers</span>}
          </li>
          <li
            onClick={() => navigate("/adminCategories")}
            className="nav-item"
            {...(isCollapsed && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Categories",
            })}
          >
            <FaTags className="nav-icon" />
            {!isCollapsed && <span className="nav-text">Categories</span>}
          </li>
        </ul>
        {isCollapsed && (
          <ReactTooltip id="sidebar-tooltip" place="right" delayShow={300} />
        )}
      </div>


    </div>
  );
};

export default SideBar;
