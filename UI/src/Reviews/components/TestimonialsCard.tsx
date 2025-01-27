import React from "react";
import { Review } from "../types/review";
import "../page/TestimonialsPage/Testimonials.css";
const  DefaultImage = '../../../public/images/DefaultImage.avif'

const TestimonialsCard: React.FC<{ testimonials: Review[] }> = ({ testimonials }) => {
    return (
        <div className="testimonial-container">
            <div className="testimonial-wrapper">
                {testimonials.map((testimonial, index) => (
                    <div className="testimonial-card" key={index}>
                        <img
                            src={testimonial.workImage || DefaultImage} // Use workImage or fallback to placeholder
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
