import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./AdminProfile.css"; 
import { logout } from "../../../../Redux/user/userSlice";
import SideBar from "../adminDashboard/SideBar";
import { User } from "../../../types/user";
import axios from "../../../utilities/axios";



const AdminProfile: React.FC = () => {
  const [adminDetails, setAdminDetails] = useState<User | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  const fetchAdminDetails = async () => {
    try {
      const response = await axios.get("/adminDetails");
      setAdminDetails(response.data);
    } catch (error) {
      console.error("Error fetching admin details:", error);
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logout());
      localStorage.clear();
      sessionStorage.clear();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout API error:", error);
    }
  };

  return (
    <div className="row admin-profile-container">
      <div className="col-lg-3 col-md-4 col-sm-12">
        <SideBar />
      </div>

      <div className="col-lg-9 col-md-8 col-sm-12">
        <div className="admin-profile">
          <h2 className="admin-name">{adminDetails?.fullName }</h2>
          <p className="admin-email">Email:{adminDetails?.email }</p>
          <p className="admin-role">Role: {adminDetails?.isAdmin ?"Admin" :"User"}</p>
          <p className="admin-contact">Contact: {adminDetails?.phone || "N/A"}</p>
          <p className="admin-contact">WhatsApp Number: {adminDetails?.whatsappNumber || "N/A"}</p>
          <p className="admin-contact">Address: {adminDetails?.address.district},{adminDetails?.address.city}
            , {adminDetails?.address.pin}
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
