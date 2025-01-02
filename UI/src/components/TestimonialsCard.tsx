import React from "react";
import image from "../assets/person.jpg"; 
import { Review } from "../types/review";
import "../pages/TestimonialsPage/Testimonials.css";

const TestimonialsCard: React.FC<{ testimonials: Review[] }> = ({ testimonials }) => {
    return (
        <div className="testimonial-container">
            <div className="testimonial-wrapper">
                {testimonials.map((testimonial, index) => (
                    <div className="testimonial-card" key={index}>
                        <img
                            src={testimonial.workImage || image} // Use workImage or fallback to placeholder
                            alt={testimonial?.userDetails?.[0]?.fullName || "User"}
                            className="testimonial-image"
                        />
                       
                        <p className="testimonial-text">
                            "{testimonial.message}"
                        </p>
                        <p className="testimonial-name">
                            {testimonial?.userDetails?.[0]?.fullName || "Anonymous"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsCard;
