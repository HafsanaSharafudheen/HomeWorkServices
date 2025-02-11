import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaUsers,
  FaCogs,
  FaTags,
  FaBars,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import "./sideBar.css";
import { logout } from "../../../../../Redux/user/userSlice";
import { useDispatch } from "react-redux";

const SideBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    localStorage.clear(); 
    sessionStorage.clear();
  
    // Prevent going back after logout
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", function () {
      window.history.pushState(null, "", window.location.href);
    });
  
    // Navigate to login & replace history
    navigate("/login", { replace: true });
  };
  
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="sidebar-header">
          <button
            className="collapse-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li
            onClick={() => navigate("/adminDashboard")}
            className="nav-item"
            {...(!isExpanded && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Dashboard",
            })}
          >
            <FaTachometerAlt className="nav-icon" />
            {isExpanded && <span className="nav-text">Dashboard</span>}
          </li>
          <li
            onClick={() => navigate("/adminBookings")}
            className="nav-item"
            {...(!isExpanded && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Bookings",
            })}
          >
            <FaCalendarAlt className="nav-icon" />
            {isExpanded && <span className="nav-text">Bookings</span>}
          </li>
          <li
            onClick={() => navigate("/adminUsers")}
            className="nav-item"
            {...(!isExpanded && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Users",
            })}
          >
            <FaUsers className="nav-icon" />
            {isExpanded && <span className="nav-text">Users</span>}
          </li>
          <li
            onClick={() => navigate("/adminServiceProviders")}
            className="nav-item"
            {...(!isExpanded && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Service Providers",
            })}
          >
            <FaCogs className="nav-icon" />
            {isExpanded && <span className="nav-text">Service Providers</span>}
          </li>
          <li
            onClick={() => navigate("/adminCategories")}
            className="nav-item"
            {...(!isExpanded && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Categories",
            })}
          >
            <FaTags className="nav-icon" />
            {isExpanded && <span className="nav-text">Categories</span>}
          </li>
          <li
            onClick={() => navigate("/adminProfile")}
            className="nav-item"
            {...(!isExpanded && {
              "data-tooltip-id": "sidebar-tooltip",
              "data-tooltip-content": "Profile",
            })}
          >
            <FaUser className="nav-icon" />
            {isExpanded && <span className="nav-text">Profile</span>}
          </li>
          <li
  onClick={() => handleLogout()} 
  className="nav-item"
  {...(!isExpanded && {
    "data-tooltip-id": "sidebar-tooltip",
    "data-tooltip-content": "Logout",
  })}
>
  <FaSignOutAlt className="nav-icon" />
  {isExpanded && <span className="nav-text">Logout</span>}
</li>

        </ul>
        {!isExpanded && (
          <ReactTooltip id="sidebar-tooltip" place="right" delayShow={300} />
        )}
      </div>

     
    </div>
  );
};

export default SideBar;