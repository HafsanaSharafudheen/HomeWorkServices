import TestimonialSlider from "../../components/TestimonialSlider";
import TestimonialsCard from "../../components/TestimonialsCard";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useTestimonials } from "./hooks/useTestimonials ";

function Testimonials() {
  const { testimonials, loading, error } = useTestimonials();

  return (
    <>
      <Header />
      {loading && <p>Loading testimonials...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && (
        <>
          <TestimonialSlider testimonials={testimonials} />
          <TestimonialsCard testimonials={testimonials} />
        </>
      )}
      <Footer />
    </>
  );
}

export default Testimonials;
