import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ServiceProvider from "../components/ServiceProvider/ServiceProvider";
import TestimonialSlider from "../components/TestimonialSlider";
import ServicesCards from "../components/servicesCards/ServicesCards";

import axios from "../axios/axios";
import { useState, useEffect } from 'react';

import { Review } from '../types/review';

const Home: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Review[]>([]);

    useEffect(() => {
      const fetchTestimonials = async () => {
        try {
          const response = await axios.get('/testimonials'); 
          setTestimonials(response.data);
        } catch (error) {
          console.error('Error fetching testimonials:', error);
        }
      };
  
      fetchTestimonials();
    }, []);
    return (
       
      
        <>
            <Header />
            <HeroSection />
            <ServicesCards />
            <ServiceProvider />
            <TestimonialSlider testimonials={testimonials} />
            <Footer />
        </>
    );
};
export default Home;
