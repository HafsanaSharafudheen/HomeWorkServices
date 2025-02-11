import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/store"; 
import { FaHome, FaHammer, FaComments, FaBell, FaInfoCircle, FaStar } from "react-icons/fa"; 
import "../../assets/css/App.css";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/user/userSlice";
import axios from "../../utilities/axios";
import defaultProfilePicture from "../../assets/images/DefaultImage.avif";
import logo from '../../assets/images/logo.png';

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [profile, setProfile] = useState<{ fullName: string; profilePicture: string }>({
    fullName: "",
    profilePicture: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/fetchUserDetails');
        const { fullName, profilePicture } = response.data.user;

        setProfile({
          fullName: fullName || "Default User",
          profilePicture:
            profilePicture
              ? `${import.meta.env.VITE_API_BASEURL}${profilePicture}` 
              : defaultProfilePicture,
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Logo */}
        <img src={logo} alt="Logo" style={{ height: "100px" }} />

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaHome />
        </button>

        {/* Collapsible Wrapper */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/">
                <FaHome className="me-2" />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/DIY">
                <FaHammer className="me-2" />
                DIY
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/aboutUs">
                <FaInfoCircle className="me-2" />
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center" to="/testimonials">
                <FaStar className="me-2" />
                Testimonials
              </Link>
            </li>

            {/* Show Messages & Bookings only if user is logged in */}
            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to="/YourChats">
                    <FaComments className="me-2" />
                    Messages
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link d-flex align-items-center" to="/YourBookings">
                    <FaBell className="me-2" />
                    Bookings
                  </Link>
                </li>
              </>
            )}

            {/* Profile Section - Only if User is Logged In */}
            {user && (
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ background: "none", border: "none" }} 
                >
                  <img
                    src={profile?.profilePicture || defaultProfilePicture}
                    className="rounded-circle navProfile-img"
                    alt="Profile"
                  />
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
