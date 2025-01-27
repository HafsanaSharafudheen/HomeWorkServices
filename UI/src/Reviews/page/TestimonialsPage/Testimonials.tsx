import Footer from "../../../User/components/Footer";
import Header from "../../../User/components/Header";
import TestimonialsCard from "../../components/TestimonialsCard";
import TestimonialSlider from "../../components/TestimonialSlider";
import { useTestimonials } from "../../hooks/useTestimonials ";

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
