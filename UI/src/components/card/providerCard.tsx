import React, { useEffect, useState } from "react";
import "./ProviderCard.css";
import defaultImage from "../../assets/images/DefaultImage.avif";
import {
  FaClock,
  FaGraduationCap,
  FaLanguage,
  FaWrench,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaBriefcase,
 
  FaCommentAlt} from "react-icons/fa";
import { Provider } from "../../types/provider";
import ServiceDetailsSidebar from "../ServiceDetailsSidebar/ServiceDetailsSidebar";
import StarRating from '../StarRating';
import { useNavigate } from "react-router-dom";

const ProviderCard: React.FC<{ provider: Provider }> = ({ provider }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
const navigate=useNavigate()
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const redirectToChat = (providerId: string, providerName: string) => {
    navigate("/messages", {
      state: { 
        providerId: providerId,
        participantName: providerName,
        isProvider: false,
      }
          });
  };
  

  return (
    <div className="col-md-12 mb-4">
      <div className="provider-card d-flex align-items-center p-3">
        {/* Left Side: Profile Image */}
        <div className="col-md-4 text-center">
          <img
            src={provider.image || defaultImage} // Use provider image or fallback to default
            alt={`${provider.fullName}'s profile`}
            className="provider-image"
          />
          <h5 className="mt-3">{provider.fullName}</h5>
          <p>{provider.contactNumber}</p>
          <p
            className={`availability-label ${provider.isAvailable ? "available" : "not-available"}`}
          >
            {provider.isAvailable ? "Available" : "Not Available"}
          </p>
          <button
  className="chat-button"
  onClick={() =>
    provider._id && provider.fullName && redirectToChat(provider._id, provider.fullName)
  }
>
  <FaCommentAlt size={10} style={{ marginRight: "5px" }} />
  Let's Chat
</button>


        </div>

        {/* Right Side: Provider Details */}
        <div className="col-md-8">
          <div className="row provider-details">
            <div className="col-md-6 col-12">
              <p>
                <FaClock className="icon" />
                {provider.workingHours.start} - {provider.workingHours.end}
              </p>
              <p>
                <FaLanguage className="icon" />
                {provider.languages.join(", ")}
              </p>
              <p>
                <FaGraduationCap className="icon" />
                {provider.education.institute} ({provider.education.year || "N/A"})
              </p>
              <p>
                <FaWrench className="icon" />
                {provider.certifications}
              </p>
              <p>
                <FaMoneyBillWave className="icon" />
                Rs {provider.serviceCharge}
              </p>
              <p>
                <FaBriefcase className="icon" />
                {provider.yearsOfExperience} years of experience
              </p>
              <p>
                <FaMapMarkerAlt className="icon" />
                {provider.address.district}, {provider.address.city}
              </p>
              <StarRating
                rating={provider.averageRating || 0}
                showRatingText={true}
              />

              <button className="btn btn-link" onClick={toggleSidebar}>
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
      {isSidebarOpen && <ServiceDetailsSidebar provider={provider} onClose={toggleSidebar} />}
     
    </div>
  );
};

export default ProviderCard;
