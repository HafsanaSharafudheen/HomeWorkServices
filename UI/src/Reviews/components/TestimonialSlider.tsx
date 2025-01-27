import React, { useState } from "react";
import { Review } from "../types/review";

const TestimonialSlider: React.FC<{ testimonials: Review[] }> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  if (!testimonials || testimonials.length === 0) return null; 
  const handlePrev = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };


  // Extract current testimonial details
  const currentTestimonial = testimonials[currentIndex];
  const quote = currentTestimonial.message;
  const author = currentTestimonial?.userDetails?.[0]?.fullName || "Anonymous";

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <div className="col-12 text-center">
          <h2 className="mb-4">Our Work, Through The Eyes Of Our Customers</h2>
        </div>
      </div>

      <div className="row align-items-center">
        <div className="col-md-2 col-12 text-center mb-3 mb-md-0">
          <button
            className="btn btn-outline-secondary"
            onClick={handlePrev}
            style={{ fontSize: "1.5rem" }}
          >
            &#8592;
          </button>
        </div>

        <div className="col-md-8 col-12 text-center">
          <div className="mb-3">
            <div
              className="quote-symbol d-flex align-items-center justify-content-center"
              style={{
                fontSize: "7rem",
                color: "#493518",
              }}
            >
              “
            </div>
            <p
              style={{
                fontStyle: "italic",
                color: "#493518",
                fontSize: "1.25rem",
              }}
            >
              {quote}
            </p>
            <p
              className="font-weight-bold text-muted"
              style={{ marginTop: "15px" }}
            >
              - {author}
            </p>
          </div>
        </div>

        <div className="col-md-2 col-12 text-center">
          <button
            className="btn btn-outline-secondary"
            onClick={handleNext}
            style={{ fontSize: "1.5rem" }}
          >
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
