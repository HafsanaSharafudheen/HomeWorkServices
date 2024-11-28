// src/pages/HomePage.tsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ServicesCards from "../components/servicesCards/servicesCards";
import ServiceProvider from "../components/ServiceProvider/ServiceProvider";
import TestimonialSlider from "../components/TestimonialSlider";
const Home: React.FC = () => {

    return (
       <>
<Header/>
<HeroSection/>
<ServicesCards/>
<ServiceProvider/>
<TestimonialSlider/>

<Footer/>
       </>
    );
};

export default Home;
