import React, { useState, useEffect } from "react";
import ServiceSidebar from "../serviceSidebar";
import ServiceNavbar from "../ServiceNavbar";
import axios from "../../../axios/axios";
import { Modal, Button } from "react-bootstrap";
import { Provider } from "../../../types/provider";
import "./serviceProfile.css";
import EditProfile from "./EditProfile";
import defaultImage from "../../../assets/person.jpg";

// Import icons
import { AiOutlineMail, AiOutlinePhone, AiOutlineSetting } from "react-icons/ai";
import { FaGraduationCap } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

function ServiceProfile() {
  const [profile, setProfile] = useState<Provider | null>(null);
  const [showEditModal, setShowEditModal] = useState(false); // State for modal visibility

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get("/serviceProviderProfile");
      if (response.status === 200) {
        setProfile(response.data.profile);
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
        <div className="col-md-3">
          <ServiceSidebar />
        </div>

        <div className="col-md-9">
          <div className="service-profile-container row">
            <div className="service-profile-left">
              {profile ? (
                <div>
                  <div className="service-profile-header">
                    <div className="profile-info">
                      <h2>Hi {profile.fullName}</h2>
                      <div className="profile-details">
                        <div> <p>
                          <AiOutlineMail className="icon" /> 
                         Email: {profile.email}
                        </p></div>
                        <div> <p>
                          <AiOutlinePhone className="icon" />
                         Phone: {profile.contactNumber}
                        </p></div>
                        <div> <p>
                          <MdCategory className="icon" />
                         Category: {profile.serviceCategory}
                        </p></div>
                        <div> <p>
                          <FaGraduationCap className="icon" />
                         Experience: {profile.yearsOfExperience}years </p>
                        </div>
                        <div> <p>
                          <AiOutlineSetting className="icon" />
                         Service Charge: {profile.serviceCharge}
                        </p></div>
                        <h6>
                <FaGraduationCap className="icon" /> Education
              </h6>
              <p>
                {profile?.education?.institute || "N/A"},{" "}
                {profile?.education?.year || "N/A"}
              </p>
              <h6>Certifications</h6>
              <p>{profile?.certifications || "No certifications available"}</p>

                      </div>
                    </div>
                    <div className="profile-image">
                      
                        <img
                          src={profile?.profileImage || defaultImage}
                          alt="Profile"
                          className="profile-img"
                        />
                      <button
                        className={`btn-availability ${
                          profile.isAvailable ? "available" : "not-available"
                        }`}
                        onClick={toggleAvailability}
                      >
                        {profile.isAvailable ? "Available" : "Not Available"}
                      </button>
                      <Button
                        variant="link"
                        className="edit-profile-link"
                        onClick={() => setShowEditModal(true)}
                      >
                        Edit Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <p>Loading profile...</p>
              )}

             
            </div>
          </div>
        </div>
      </div>
      {/* Modal for Edit Profile */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg"
      >
        <Modal.Body>
          <EditProfile />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ServiceProfile;
