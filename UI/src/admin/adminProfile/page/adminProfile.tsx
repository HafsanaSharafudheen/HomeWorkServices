import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { FaMapMarkerAlt, FaSignOutAlt } from "react-icons/fa";

import "./AdminProfile.css";
import { logout } from "../../../../Redux/user/userSlice";
import { useAdminDetails } from "../hooks/useAdminDetails";
const defaultImage = "../../../../public/images/DefaultImage.avif";

const SideBar = lazy(() => import("../../adminDashboard/page/sideBar/SideBar"));

const AdminProfile: React.FC = () => {
  const { adminDetails, loading, error } = useAdminDetails();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="ErrorMessage">{error}</div>;
  }

  return (
    <div className="row AdminProfileContainer">
      <div className="col-lg-3 col-md-4 col-sm-12">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <SideBar />
        </Suspense>
      </div>

      <div className="col-lg-9 col-md-8 col-sm-12">
        <div className="AdminProfile">
          <div className="ProfilePictureContainer">
          <img
  src={adminDetails?.profilePicture ? adminDetails.profilePicture : defaultImage}
  alt="Admin Profile"
  className="ProfilePicture"
/>

          </div>
          <h2 className="headingStyle">
           {adminDetails?.fullName}
          </h2>
          <p className="AdminEmail">
            <AiOutlineMail className="AdminIcons" /> {adminDetails?.email}
          </p>
          <p className="AdminRole">
            <AiOutlineSetting className="AdminIcons" /> Role: {adminDetails?.isAdmin ? "Admin" : "User"}
          </p>
          <p className="AdminContact">
            <AiOutlinePhone className="AdminIcons" /> Phone: {adminDetails?.phone || "N/A"}
          </p>
          <p className="AdminContact">
            <AiOutlinePhone className="AdminIcons" /> WhatsApp: {adminDetails?.whatsappNumber || "N/A"}
          </p>
          <p className="AdminAddress">
            <FaMapMarkerAlt className="AdminIcons" /> Address:{" "}
            {adminDetails?.address?.district}, {adminDetails?.address?.city}, {adminDetails?.address?.pin}
          </p>

          <div className="AdminActions">
            <button className="DefaultButton2" onClick={handleLogout}>
              <FaSignOutAlt className="AdminIcons" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
