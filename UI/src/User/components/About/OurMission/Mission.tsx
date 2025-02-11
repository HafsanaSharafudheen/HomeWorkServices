import React from "react";
import missionImage from "../../../../assets/images/mission.avif"; 
import './mission.css'



const services = [
  {
    title: "Home Services",
    description: "Plumbing, electrical work, home repairs at your convenience.",
  },
  
  {
    title: "Affordable Pricing & Service Charges",
    description: "Transparent pricing with no hidden costs, ensuring affordability.",
  },
  
  {
    title: "Instant & Scheduled Services",
    description: "Book services instantly or schedule them at your preferred time.",
  }, {
    title: "Verified Professionals",
    description: "All service providers are background-verified and highly skilled.",
  },
  {
    title: "Real-Time Tracking & Notifications",
    description: "Track your booked service and get real-time updates and notifications.",
  },
  {
    title: "24/7 Customer Support",
    description: "Dedicated support available round-the-clock to assist with queries.",
  },
];

const Mission = () => {
  return (
    <div className="py-5">
        <div className="row align-items-center">

{/* What We Offer Section */}
<div className="col-md-12 col-12">
  <h2 className="headingStyle fw-bold text-center">What We Offer</h2>
  <div className="row justify-content-center">
    {services.map((service, index) => (
      <div key={index} className="col-md-4 col-sm-6 col-12 d-flex justify-content-center">
        <div className="custom-Missioncard">
        
          <div className="Missioncard-body">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
         
        </div>
      </div>
    ))}
  </div>
</div>
</div>

       <div className="container-fluid mission-wrapper mt-5">
      <div className="row g-0 align-items-center">
        {/* Mission Section */}
       

        {/* Image Section */}
        <div className="col-md-6 col-12 image-section">
          <img src={missionImage} alt="Our Mission" className="img-fluid" />
        </div>
        <div className="col-md-6 col-12 mission-section d-flex align-items-center justify-content-center">
          <div className="text-white">
            <h2 className="fw-bold m-5">Our Mission</h2>
            <p className="text-white m-5">
              At <strong>Home Works</strong>, our goal is to make service booking seamless and stress-free.
              We connect users with skilled professionals to ensure top-quality, reliable, and efficient services.
              Our mission is to provide a <strong>trusted, accessible, and affordable platform</strong> for all service needs.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="row additional-features">
  <h2 className="headingStyle">Additional Features</h2>
  
  <div className="row mt-4">
    <div className="col-md-6 col-12">
      <div className="feature-card">
        <h6>Chat with Our Service Experts</h6>
        <p>
          Need help? Our experts are available for live chat to assist you in selecting the right service and resolving any queries.
        </p>
      </div>
    </div>
    <div className="col-md-6 col-12">
      <div className="feature-card">
        <h6>User Reviews & Ratings</h6>
        <p>
          We believe in transparency. Read reviews and ratings from real users to help you choose the best service providers.
        </p>
      </div>
    </div>
  </div>

  <div className="row mt-4">
    <div className="col-md-6 col-12">
      <div className="feature-card">
        <h6>DIY Support for Doubt Clearing</h6>
        <p>
          Explore our DIY Guides for self-help tutorials and troubleshooting steps before booking a service.
        </p>
      </div>
    </div>
    <div className="col-md-6 col-12">
      <div className="feature-card">
        <h6>Secure & Reliable Payments</h6>
        <p>
          We ensure secure transactions with multiple payment options for your convenience.
        </p>
      </div>
    </div>
  </div>
</div>


    </div>

  );
};

export default Mission;


