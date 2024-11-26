import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/signup/Signup';
import ServiceProviderSignup from './pages/serviceProviderSignup/ServiceProviderSignup';
import Testimonials from './pages/Testimonials/testimonials';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   
             <Route path="/login" element={<Login />} />
             <Route path="/signup" element={<Signup />} />

             <Route path="/serviceProviderSignup" element={<ServiceProviderSignup />} />
             
             <Route path="/testimonials" element={<Testimonials />} />

      </Routes>
    </Router>
  );
};

export default App;
