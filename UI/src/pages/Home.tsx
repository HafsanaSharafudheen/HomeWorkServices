import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ServiceProvider from "../components/ServiceProvider/ServiceProvider";
import TestimonialSlider from "../components/TestimonialSlider";
import ServicesCards from "../components/servicesCards/ServicesCards";

import axios from "../axios/axios";
import { useState, useEffect } from 'react';

import { Review } from '../types/review';
import { Alert, Spinner } from "react-bootstrap";

const Home: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Review[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('/testimonials');
                setTestimonials(response?.data || []);
            } catch (error) {
                setError('Failed to load testimonials. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    useEffect(() => {
        const message = localStorage.getItem("successMessage");
        if (message) {
            setSuccessMessage(message);
            localStorage.removeItem("successMessage");

            // Automatically close the alert after 2 seconds
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 2000);

            // Cleanup the timer
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <>
            {successMessage && (
                <div className="alert-container">
                    <Alert
                        variant="success"
                        className="text-center"
                        dismissible
                        onClose={() => setSuccessMessage(null)} // Close button 
                    >
                        {successMessage}
                    </Alert>
                </div>
            )}
            {error && <Alert variant="danger">{error}</Alert>}

            <Header />
            <HeroSection />
            <ServicesCards />
            <ServiceProvider />
            {loading ? (
                <div className="text-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <TestimonialSlider testimonials={testimonials} />
            )}
            <Footer />
        </>
    );
};

export default Home;
