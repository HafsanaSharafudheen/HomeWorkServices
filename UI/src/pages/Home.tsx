import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import ServiceProvider from "../components/ServiceProvider/ServiceProvider";
import TestimonialSlider from "../components/TestimonialSlider";
import ServicesCards from "../components/servicesCards/ServicesCards";
const Home: React.FC = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <ServicesCards />
            <ServiceProvider />
            <TestimonialSlider />
            <Footer />
        </>
    );
};
export default Home;
