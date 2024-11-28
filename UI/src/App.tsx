import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/signup/Signup';
import ServiceProviderSignup from './pages/serviceProviderSignup/ServiceProviderSignup';
import Testimonials from './pages/TestimonialsPage/Testimonials';
import About from './components/About/About';
import ServicesCards from './components/servicesCards/servicesCards';
import ServiceProviderDashboard from './pages/ServiceProviderDashboard/ServiceProviderDashboard';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />
             <Route path="/aboutUs" element={<About />} />

             <Route path="/serviceProviderSignup" element={<ServiceProviderSignup />} />
             
             <Route path="/testimonials" element={<Testimonials />} />
             <Route path="/service-provider-dashboard" element={<ServiceProviderDashboard />} />


      </Routes>
    </Router>
  );
};

export default App;
