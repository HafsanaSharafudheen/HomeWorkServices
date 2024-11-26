import React, { useState } from "react";
import image from '../assets/person.jpg'
interface Testimonial {
  id: number;
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The outdoor deck they built has transformed our backyard. It's both beautiful and sturdy, and we’ve already hosted several gatherings. The process was smooth from start to finish.",
    author: "Emily Roberts",
  },
  {
    id: 2,
    quote:
      "The team was professional, efficient, and exceeded our expectations. We love the work they did on our living room renovation.",
    author: "John Smith",
  },
  {
    id: 3,
    quote:
      "Their attention to detail and commitment to quality really impressed us. We’re thrilled with the results!",
    author: "Sophia Taylor",
  },
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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

  const { quote, author } = testimonials[currentIndex];

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        {/* Heading */}
        <div className="col-12 text-center">
          <h2 className="mb-4">Our Work, Through The Eyes Of Our Customers</h2>
        </div>
      </div>

      <div className="row align-items-center">
        {/* Left Arrow */}
        <div className="col-md-2 col-12 text-center mb-3 mb-md-0">
          <button
            className="btn btn-outline-secondary"
            onClick={handlePrev}
            style={{ fontSize: "1.5rem" }}
          >
            &#8592;
          </button>
        </div>

        {/* Quote and Author */}
        <div className="col-md-8 col-12 text-center">
  <div className="mb-3">
    {/* Quote Symbol with Circular Background */}
    <div
      className="quote-symbol d-flex align-items-center justify-content-center"
      style={{
        fontSize: "7rem",
      color:"493518",
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
    <img className="testimonial-image" src={image}/>
    <p
      className="font-weight-bold text-muted"
      style={{ marginTop: "15px" }}
    >
      - {author}
    </p>
  </div>
</div>

        {/* Right Arrow */}
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
