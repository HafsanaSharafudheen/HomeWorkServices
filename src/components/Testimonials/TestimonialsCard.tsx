import { useState } from "react";
import './Testimonials.css'
import image from '../../assets/person.jpg'
function TestimonialsCard() {
 
    const [paused, setPaused] = useState(false);

const testimonials = [
  {
    name: "Lucy Hayes",
    image: image,
    text: "Their team transformed my kitchen with beautiful cabinetry. The quality of work exceeded my expectations!",
  },
  {
    name: "John Turner",
    image: image,
    text: "The custom furniture piece they built for my living room is stunning! I couldn't be happier with the outcome.",
  },
  {
    name: "Sophia Lee",
    image: image,
    text: "I wanted some intricate woodwork done for my home office, and they delivered exactly what I envisioned. Truly skilled artisans!",
  },
  {
    name: "Mike Richards",
    image: image,
    text: "I had my old deck replaced, and the result is fantastic. They worked efficiently, and the deck is now my favorite place to relax.",
  },
];



    return (
        <div className="testimonial-container">
          {/* Duplicate the list for seamless looping */}
          <div className="testimonial-wrapper">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={`original-${index}`}>
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
            {/* Duplicate testimonials for infinite scrolling */}
            {testimonials.map((testimonial, index) => (
              <div className="testimonial-card" key={`duplicate-${index}`}>
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-image" />
                <h3 className="testimonial-name">{testimonial.name}</h3>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      );
}

export default TestimonialsCard