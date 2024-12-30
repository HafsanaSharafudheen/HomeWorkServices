import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBook, FaEnvelope, FaTools, FaUser } from "react-icons/fa"; 

const ServiceSidebar = () => {
  return (
    <div className="sidebar p-3">
      <ul className="list-unstyled">
        <li className="nav-item">
          <NavLink to="/serviceProviderDashboard" className="nav-link d-flex align-items-center">
            <FaTachometerAlt className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ProviderBookings" className="nav-link d-flex align-items-center">
            <FaBook className="me-2" /> Bookings
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/messages" className="nav-link d-flex align-items-center">
            <FaEnvelope className="me-2" /> Messages
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/diyhub" className="nav-link d-flex align-items-center">
            <FaTools className="me-2" /> DIY Hub
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/ServiceProfile" className="nav-link d-flex align-items-center">
            <FaUser className="me-2" /> Profile
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ServiceSidebar;
