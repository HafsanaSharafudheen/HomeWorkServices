import React, { useState } from "react";
import "./About.css";
import Header from '../Header';
import Footer from '../Footer'
import CircularServices from "./CircularServices";

const AboutUs = () => {
  const [showContent, setShowContent] = useState(false);

  const handleClick = () => {
    setShowContent(true);
  };

  return (
    <>
    <Header/>
    <div className="about-us-container">
      <div className={`about-us-background ${showContent ? "expanded" : ""}`}>
        {!showContent && (
          <div className="about-us-circle" onClick={handleClick}>
            About Us
          </div>
        )}

        {showContent && (
          <div className="about-us-content">
            <h2>About Us</h2>
            <p className="animate__animated animate__fadeInLeft">
              Welcome to our service-providing app! We aim to connect skilled professionals with people who need their expertise. 
              Our mission is to create a platform where service providers and customers can interact seamlessly and build trust.
            </p>
            <p className="animate__animated animate__fadeInLeft">
              Whether you need a carpenter, plumber, electrician, or any other skilled service, our app ensures you find the 
              best professionals in your area. Experience hassle-free service requests and exceptional results with our app.
            </p>
          </div>
        )}
      </div>
    </div>


    <Footer/>
    </>
  );
};

export default AboutUs;
