import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store"; 
import { FaHome,  FaHammer, FaComments, FaBell, FaInfoCircle, FaStar } from "react-icons/fa"; 
import "../../assets/css/App.css";

import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/user/userSlice";
import axios from "../../utilities/axios";
import defaultProfilePicture  from "../../assets/images/DefaultImage.avif";
import  logo from '../../assets/images/logo.png'
const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  const [profile, setProfile] = useState<{ fullName: string; profilePicture: string }>({
    fullName: "",
    profilePicture: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Dispatch logout action
    dispatch(logout());

    // Clear localStorage and sessionStorage
    localStorage.clear();
    sessionStorage.clear();

    // Navigate to the login page
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/fetchUserDetails');
        const { fullName, profilePicture } = response.data.user;
  console.log(response.data)
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
  
    fetchUserDetails();
  }, []); // Dependency array empty if user is static.
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {/* Logo */}
        <img src={logo} alt="Logo" style={{ height: "100px" }} />

        {/* If user exists, show full navbar, otherwise show only Home */}
        {user ? (
          <>
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
                  {/* <a className="nav-link d-flex align-items-center" href="/">
                    <FaHome className="me-2" />
                    Home
                  </a> */}
                  <Link to="/DIY" className="nav-link d-flex align-items-center">
                    <FaHammer className="me-2" />
                    DIY
                  </Link>
                  
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="/DIY">
                    <FaHammer className="me-2" />
                    DIY
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="/YourChats">
                    <FaComments className="me-2" />
                    Messages
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="/YourBookings">
                    <FaBell className="me-2" />
                    Bookings
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="/aboutUs">
                    <FaInfoCircle className="me-2" />
                    About Us
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link d-flex align-items-center" href="/testimonials">
                    <FaStar className="me-2" />
                    Testimonials
                  </a>
                </li>

                {/* Profile Section */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle d-flex align-items-center"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                  <img
    src={
      profile.profilePicture
        ? profile.profilePicture
        : defaultProfilePicture
    }
    className="rounded-circle navProfile-img"
    alt="Profile"
  />

                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <li>
                        <a className="dropdown-item" href="/profile">
                          My Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#" onClick={handleLogout}>
                          Logout
                        </a>
                      </li>
                    </ul>
                  </li>
              </ul>
            </div>
          </>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;