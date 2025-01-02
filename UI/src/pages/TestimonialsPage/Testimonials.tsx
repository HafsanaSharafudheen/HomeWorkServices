import { useEffect, useState } from "react";
import TestimonialSlider from '../../components/TestimonialSlider';
import TestimonialsCard from '../../components/TestimonialsCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from "../../axios/axios";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

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
      <TestimonialSlider testimonials={testimonials} />
      <TestimonialsCard testimonials={testimonials} />
      <Footer />
    </>
  );
}

export default Testimonials;
