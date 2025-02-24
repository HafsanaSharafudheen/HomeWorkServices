import React from "react";
import { Review } from "../types/review";
import "../page/TestimonialsPage/Testimonials.css";
import  DefaultImage from '../../assets/images//DefaultImage.avif'

const TestimonialsCard: React.FC<{ testimonials: Review[] }> = ({ testimonials }) => {
    return (
        <div className="testimonial-container">
            <div className="testimonial-wrapper">
                {testimonials.map((testimonial, index) => (
                    <div className="testimonial-card" key={index}>
                        <img
                         src={
                            testimonial.workImage
                                ? `${import.meta.env.VITE_API_BASEURL}/${testimonial.workImage}`
                                : DefaultImage
                            }
                            alt={testimonial?.userDetails?.[0]?.fullName || "User"}
                            className="testimonial-image"
                        />
                       
                        <p className="testimonial-text">
                            "{testimonial.message}"
                        </p>
                        <p className="testimonial-name">
                            {testimonial?.userDetails?.[0]?.fullName || ""}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestimonialsCard;
