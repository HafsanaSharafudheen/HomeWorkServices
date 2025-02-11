import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/user/userSlice";
import { FaTachometerAlt, FaBook, FaEnvelope, FaTools, FaUser, FaBars, FaSignOutAlt } from "react-icons/fa";
import "./providerSidebar.css";

const ProviderSidebar = () => {
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

    navigate("/login", { replace: true });
  };

  return (
    <div className={`providerSidebar ${isExpanded ? "providerSidebar-expanded" : "providerSidebar-collapsed"}`}>
      {/* Toggle Button */}
      <div className="providerSidebar-header" onClick={() => setIsExpanded(!isExpanded)}>
        <button className="providerSidebar-toggle">
          <FaBars size={24} color="white" />
        </button>
      </div>

      {/* Sidebar Items */}
      <ul className="providerSidebar-navLinks">
        <SidebarItem to="/serviceProviderDashboard" icon={<FaTachometerAlt size={20} />} label="Dashboard" isExpanded={isExpanded} />
        <SidebarItem to="/ProviderBookings" icon={<FaBook size={20} />} label="Bookings" isExpanded={isExpanded} />
        <SidebarItem to="/providerChats" icon={<FaEnvelope size={20} />} label="Messages" isExpanded={isExpanded} />
        <SidebarItem to="/diyhub" icon={<FaTools size={20} />} label="Tools" isExpanded={isExpanded} />
        <SidebarItem to="/ServiceProfile" icon={<FaUser size={20} />} label="Profile" isExpanded={isExpanded} />

        {/* Logout Button - Uses the Same Styles */}
        <li className="providerSidebar-navItem">
          <button onClick={handleLogout}>
            <FaSignOutAlt size={20} />
            {isExpanded && <span className="providerSidebar-navText">Logout</span>}
          </button>
        </li>
      </ul>
    </div>
  );
};

const SidebarItem = ({ to, icon, label, isExpanded }: { to: string; icon: JSX.Element; label: string; isExpanded: boolean }) => {
  return (
    <li className="providerSidebar-navItem">
      <NavLink to={to} className={({ isActive }) => `providerSidebar-navLink ${isActive ? "providerSidebar-active" : ""}`}>
        {icon}
        {isExpanded && <span className="providerSidebar-navText">{label}</span>}
      </NavLink>
    </li>
  );
};

export default ProviderSidebar;
