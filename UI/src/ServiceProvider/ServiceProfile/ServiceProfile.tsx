import React, { useState, useEffect } from "react";
import ServiceSidebar from "../serviceSidebar";
import ServiceNavbar from "../ServiceNavbar";
import axios from "../../utilities/axios";
import {  Button } from "react-bootstrap";
import { Provider } from "../types/provider";
import "./serviceProfile.css";

// Import icons
import { AiOutlineMail, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { FaGraduationCap, FaMapMarkerAlt, FaMedal } from 'react-icons/fa';
import { MdCategory } from "react-icons/md";
import { AiOutlineClockCircle, AiOutlineWhatsApp } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { logout } from "../../../Redux/user/userSlice";
import { useDispatch } from "react-redux";
const defaultImage = "../../../public/images/DefaultImage.avif";

function ServiceProfile() {
  const [profile, setProfile] = useState<Provider | null>(null);
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get("/serviceProviderProfile");
      if (response.status === 200) {
        setProfile(response.data.profile);
        setProfileId(response.data.profile._id);
      } else {
        alert("Failed to fetch profile details");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Failed to fetch profile details");
    }
  };

  const toggleAvailability = async () => {
    try {
      const updatedAvailability = !profile?.isAvailable;
      const response = await axios.post("/updateAvailability", {
        isAvailable: updatedAvailability,
      });

      if (response.status === 200) {
        setProfile((prevState) => ({
          ...prevState!,
          isAvailable: updatedAvailability,
        }));
      } else {
        alert("Failed to update availability status");
      }
    } catch (error) {
      console.error("Error updating availability status:", error);
      alert("Failed to update availability status");
    }
  };
   // Handle logout
   const handleLogout = async () => {
   

    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];


      const formData = new FormData();
      formData.append('profilePicture', selectedFile);
      formData.append('entityType', 'provider');

      try {
        const response = await axios.post('/upload-profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert(response.data.message);

        // Update the user state with the new profile picture
        setProfile((prevUser) => {
          if (prevUser) {
            return { ...prevUser, profilePicture: response.data.filePath };
          }
          return prevUser;
        });
      } catch (error: any) {
        alert(error.response?.data?.error || 'An error occurred while uploading');
      }
    }
  };

  return (
    <div>

      <ServiceNavbar />
      <div className="row">

     
       <div className="col-md-4">
       <ServiceSidebar />

       </div>

        <div className="col-md-8">
  <div className="service-profile row">

    <div className="col-md-6 service-profile-left">
      {profile ? (
        <div className="profile-details">
          <p>
            <AiOutlineMail className="icon" />
            {profile.email}
          </p>
          <p>
            <AiOutlinePhone className="icon" />
            {profile.contactNumber}
          </p>
          <p>
            <AiOutlineWhatsApp className="icon" />
            {profile.whatsappNumber || "Not Provided"}
          </p>
          <p>
            <AiOutlineSetting className="icon" />
            {profile.serviceCharge || "N/A"}
          </p>
          <p>
            <AiOutlineClockCircle className="icon" />
            {profile.workingHours?.start || "N/A"} - {profile.workingHours?.end || "N/A"}
          </p>
          <p>
            <MdCategory className="icon" />
            {profile.serviceCategory}
          </p>
          <p>
            <FaGraduationCap className="icon" />
            {profile.yearsOfExperience} years
          </p>
          <p>
            <FaGraduationCap className="icon" />
            {profile?.education?.institute || "N/A"},{" "}
            {profile?.education?.year || "N/A"}
          </p>
          <p>
  <FaMedal className="icon" />
  Certifications: {profile?.certifications || "No certifications available"}
</p>          <p>
  <FaMapMarkerAlt className="icon" />
  Address: {profile?.address?.city || "N/A"},{" "}
  {profile?.address?.district || "N/A"},{" "}
  {profile?.address?.pin || "N/A"}
</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>

    <div className="col-md-6 mt-5">
    <div>
  {profile && (
    <>
      <h2 className="headingStyle">{profile.fullName}</h2>

      {/* Clickable Profile Image */}
      <img
        className="providerProfile-img"
        src={
          profile.profilePicture
            ? `${import.meta.env.VITE_API_BASEURL}${profile.profilePicture}`
            : defaultImage
        }
        alt="Profile"
        onClick={() => document.getElementById("fileInput")?.click()} // Trigger file input on image click
      />
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      <div>
        <button
          className={`btn-availability ${
            profile.isAvailable ? "available" : "not-available"
          }`}
          onClick={toggleAvailability}
        >
          {profile.isAvailable ? "Available" : "Not Available"}
        </button>
        <div className="action-links">
  <Button
    variant="link"
    className="editProfileLink"
    onClick={() =>
      navigate("/serviceProviderSignup", {
        state: { mode: "edit", profileId: profileId?.toString() },
      })
    }
  >
    Edit Profile
  </Button>
  <Button
    variant="link"
    className="editProfileLink"
    onClick={handleLogout}
   
  >
    Logout
  </Button>
</div>

      </div>
    </>
  )}
</div>

</div>

  </div>
</div>

</div>
    </div>
  );
}

export default ServiceProfile;
