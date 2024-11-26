import React from 'react'
import TestimonialSlider from '../../components/Testimonials/TestimonialSlider'
import TestimonialsCard from '../../components/Testimonials/TestimonialsCard'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Testimonials() {
  return (
   <>
   <Header/>
        <TestimonialSlider/>
   <TestimonialsCard/>
   <Footer/>
   </>
  )
}

export default Testimonials