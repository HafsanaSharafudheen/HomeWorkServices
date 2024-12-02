import React from "react";
import "./ProviderCard.css";
import defaultImage from "../../assets/person.jpg";
import { FaClock, FaGraduationCap, FaLanguage, FaWrench, FaMoneyBillWave } from "react-icons/fa";

const ProviderCard: React.FC<{ provider: any }> = ({ provider }) => {

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
          <p>
  <span
    className={`availability-label ${
      provider.isAvailable ? "available" : "not-available"
    }`}
  >
    {provider.isAvailable ? "Available" : "Not Available"}
  </span>
</p>

        </div>

<div className="col-md-8">
  <div className="row provider-details">
    <div className="col-md-6 col-12">
      <p>
        <FaClock className="icon" /> {provider.workingHours}
      </p>
      <p>
        <FaLanguage className="icon" /> {provider.languages.join(", ")}
      </p>
      <p>
        <FaGraduationCap className="icon" /> {provider.education.institute} (
        {provider.education.year || "N/A"})
      </p>
      <p>
        <FaWrench className="icon" /> {provider.certifications}
      </p>
    </div>

    <div className="col-md-6 col-12">
      <div className="service-charges">
        {provider.serviceCharges.map((charge: any) => (
          <p key={charge._id}>
            <FaMoneyBillWave className="icon" /> {charge.type}: ₹
            {charge.amount}
          </p>
        ))}
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default ProviderCard;
