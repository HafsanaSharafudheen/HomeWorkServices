import React, { useState } from "react";
import "./ServicesCards.css";
import electrian from "../../assets/Electrian.avif";
import plumber from "../../assets/plumber.avif";
import beautician from "../../assets/beautician-concept-illustration_114360-18085.avif";
import carpenter from "../../assets/carpender2.avif";
import cctv from "../../assets/cctv.avif";
import painter from "../../assets/painter.avif";
import interiordesing from "../../assets/interior-design-concept-illustration_114360-5406.avif";
import cleaning from '../../assets/cleaning.avif'
import HomeRenovation from '../../assets/homeRenovatin.jpg'
import homeNurse from '../../assets/nursing.avif'
import appliancesService from '../../assets/appliances.avif'
import Gardner from "../../assets/gardner.avif"

const servicesData = [
  { id: 1, name: "Plumber", icon: plumber },
  { id: 2, name: "Electrician", icon: electrian },
  { id: 3, name: "Beautician", icon: beautician },
  { id: 4, name: "Carpenter", icon: carpenter },
  { id: 5, name: "CCTV Mechanic", icon: cctv },
  { id: 6, name: "Interior Designing", icon: interiordesing },
  { id: 7, name: "Painter", icon: painter },
  { id: 8, name: "Cleaning", icon: cleaning },
  { id: 9, name: "Home Renovation", icon: HomeRenovation },

  { id: 10, name: "Home Nurse", icon: homeNurse },
  { id: 11, name: "Appliances Service", icon: appliancesService },
  { id: 12, name: "Gardner", icon: Gardner },


];

const ServicesCards: React.FC = () => {
  const [visibleServices, setVisibleServices] = useState(6);

  const handleLoadMore = () => {
    setVisibleServices((prev) => prev + 6);
  };

  return (
    <div className="container text-center my-5">
      <div className="row mt-5">
        <h1 className="HeadingStyle">OUR SERVICES</h1>
        {servicesData.slice(0, visibleServices).map((service) => (
          <div key={service.id} className="col-lg-2 col-md-3 col-sm-6 mb-4" >
            <div className="service-card">
              <img
                src={service.icon}
                alt={service.name}
                className="service-icon"
              />
              <p>{service.name}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleServices < servicesData.length && (
        <button className="DefaultButton" onClick={handleLoadMore}>
          All services
        </button>
      )}
    </div>
  );
};

export default ServicesCards;
