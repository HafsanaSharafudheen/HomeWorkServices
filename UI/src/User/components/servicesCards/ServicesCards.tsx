import React, { useEffect, useState } from "react";
import "./ServicesCards.css";
import { useNavigate } from "react-router-dom";
import axios from "../../../utilities/axios";

const ServicesCards: React.FC = () => {
  const [servicesData, setServicesData] = useState([]);
  const [visibleServices, setVisibleServices] = useState(6);
  const navigate = useNavigate();

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("/allServices");
        setServicesData(response.data.servicesData);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  const handleLoadMore = () => {
    setVisibleServices((prev) => prev + 6);
  };

  const handleServiceClick = (serviceName: string) => {
    navigate("/providers", { state: { serviceName } });
  };

  return (
    <div className="container text-center my-5">
      <div className="row mt-5">
        <h1 id="serviceSection" className="HeadingStyle">OUR SERVICES</h1>
        {servicesData.slice(0, visibleServices).map((service: any) => (
          <div
            key={service._id}
            className="col-lg-2 col-md-3 col-sm-6 mb-4"
            onClick={() => handleServiceClick(service.categoryName)}
          >
            <div className="service-card">
              <img
                src={`${import.meta.env.VITE_API_BASEURL}/${service.categoryImage}`}
                alt={service.categoryName}
                className="service-icon"
              />
              <p>{service.categoryName}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleServices < servicesData.length && (
        <button className="DefaultButton" onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default ServicesCards;
