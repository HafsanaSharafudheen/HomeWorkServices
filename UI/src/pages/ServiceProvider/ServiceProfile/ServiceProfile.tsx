import React, { useState, useEffect } from "react";
import ServiceSidebar from "../serviceSidebar";
import ServiceNavbar from "../ServiceNavbar";
import axios from "../../../axios/axios";
import "./serviceProfile.css";
import { Button, Form } from "react-bootstrap";

function ServiceProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [serviceCharges, setServiceCharges] = useState({
    basicPayment: "",
    emergencyPayment: "",
    onsiteCharge: "",
    advancedCharge: "",
  });
  const [isChargesFormVisible, setIsChargesFormVisible] = useState(false);
  const defaultImage = 'data:image/jpeg;base64,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';

  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get("/serviceProviderProfile");
      if (response.status === 200) {
        setProfile(response.data.profile);
        setServiceCharges(response.data.profile.serviceCharges || []);
        setIsChargesFormVisible(response.data.profile.serviceCharges.length === 0);
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
        setProfile((prevState: any) => ({
          ...prevState,
          isAvailable: updatedAvailability,
        }));
        alert(response.data.message || "Availability status updated successfully");
        fetchProfileDetails();

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
          <div className="service-profile-container">
            <div className="col-md-8">
              <div className="service-profile-left">
                {profile ? (
                  <div>
                    <div className="service-profile-header">
                      <div className="profile-info">
                        <h2>Hi {profile.fullName}</h2>
                        <div className="profile-details">
                          <div>
                            <strong>Email:</strong> {profile.email}
                          </div>
                          <div>
                            <strong>Phone:</strong> {profile.contactNumber}
                          </div>
                          <div>
                            <strong>Category:</strong> {profile.serviceCategory}
                          </div>
                          <div>
                            <strong>Experience:</strong> {profile.yearsOfExperience} years
                          </div>
                        </div>
                      </div>
                      <div className="profile-image">
                        <div className="profile-img-container">
                          <img
                            src={profile?.profileImage || defaultImage} 
                             alt="Profile"
                            className="profile-img"
                          />
                        </div>
                        <button
                          className={`btn-availability ${profile.isAvailable ? "available" : "not-available"}`}
                          onClick={toggleAvailability}
                        >
                          {profile.isAvailable ? "Available" : "Not Available"}
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p>Loading profile...</p>
                )}
              </div>
            </div>

            <div className="col-md-4">
              <div className="service-profile-right">
                <h6>Education</h6>
                <p>{profile?.education?.institute || "N/A"}, {profile?.education?.year || "N/A"}</p>
                <h6>Certifications</h6>
                <p>{profile?.certifications || "No certifications available"}</p>
              </div>
            </div>
          </div>

          <div className="service-profile-charges">
            <h4>Service Charges</h4>
            {profile?.serviceCharges?.length > 0 ? (
              <div className="service-charges-container">
                {profile.serviceCharges.map((charge: any, index: number) => (
                  <div className="coin" key={index}>
                    <div className="coin-amount">{charge.amount}</div>
                    <div className="coin-type">{charge.type}</div>
                  </div>
                ))}
              </div>
            ) : (
              isChargesFormVisible && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Save service charges logic here
                  }}
                  className="row"
                >
                  {/* Service Charges Input Fields */}
                </form>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceProfile;
