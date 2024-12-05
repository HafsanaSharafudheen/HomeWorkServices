import React, { useState, useEffect } from "react";
import ServiceSidebar from "../serviceSidebar";
import ServiceNavbar from "../ServiceNavbar";
import axios from "../../../axios/axios";
import { Modal, Button } from "react-bootstrap";
import { Provider } from "../../../types/provider";
import "./serviceProfile.css";
import defaultImage from "../../../assets/person.jpg";

// Import icons
import { AiOutlineMail, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { AiOutlineClockCircle, AiOutlineWhatsApp } from "react-icons/ai";

import { useNavigate } from "react-router-dom";

function ServiceProfile() {
  const [profile, setProfile] = useState<Provider | null>(null);
  const navigate = useNavigate();
  const [profileId, setProfileId] = useState<string | null>(null);

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

  return (
    <div>
      <ServiceNavbar />
      <div className="row">
        <div className="col-md-4">
          <ServiceSidebar />
        </div>

        <div className="col-md-8">
  <div className="service-profile-container row">
    {/* Left Section: Profile Details */}
    <div className="col-md-8 service-profile-left">
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
          <p>Certifications: {profile?.certifications || "No certifications available"}</p>
          <p>
            Address: {profile.address?.city || "N/A"},{" "}
            {profile.address?.district || "N/A"},{" "}
            {profile.address?.pin || "N/A"}
          </p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>

    {/* Right Section: Profile Image and Buttons */}
    <div className="col-md-4">
      <h2>Hi {profile?.fullName}</h2>
      <img
        src={profile?.profileImage || defaultImage}
        alt="Profile"
        className="profile-img"
      />
      <button
        className={`btn-availability ${
          profile?.isAvailable ? "available" : "not-available"
        }`}
        onClick={toggleAvailability}
      >
        {profile?.isAvailable ? "Available" : "Not Available"}
      </button>
      <Button
        variant="link"
        className="edit-profile-link"
        onClick={() =>
          navigate("/serviceProviderSignup", {
            state: { mode: "edit", profileId: profileId?.toString() },
          })
        }
      >
        Edit Profile
      </Button>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}

export default ServiceProfile;
