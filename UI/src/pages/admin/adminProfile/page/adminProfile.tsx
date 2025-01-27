import React, { Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AdminProfile.css"; 
import { logout } from "../../../../../Redux/user/userSlice";
import { useAdminDetails } from "../hooks/useAdminDetails";

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
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="row admin-profile-container">
      <div className="col-lg-3 col-md-4 col-sm-12">
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <SideBar />
        </Suspense>
      </div>

      <div className="col-lg-9 col-md-8 col-sm-12">
        <div className="admin-profile">
          <h2 className="admin-name">{adminDetails?.fullName}</h2>
          <p className="admin-email">Email: {adminDetails?.email}</p>
          <p className="admin-role">Role: {adminDetails?.isAdmin ? "Admin" : "User"}</p>
          <p className="admin-contact">Contact: {adminDetails?.phone || "N/A"}</p>
          <p className="admin-contact">WhatsApp Number: {adminDetails?.whatsappNumber || "N/A"}</p>
          <p className="admin-contact">
            Address: {adminDetails?.address?.district}, {adminDetails?.address?.city},{" "}
            {adminDetails?.address?.pin}
          </p>

          <div className="admin-actions">
            <button className="DefaultButton2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
