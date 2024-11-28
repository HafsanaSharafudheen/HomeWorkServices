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
import Category from './pages/admin/adminCategory/Category';
import AdminDashboard from './pages/admin/adminDashboard/AdminDashboard'
import AdminUsers from './pages/admin/adminUsers/AdminUsers';
import AdminServiceProviders from './pages/admin/adminServices/AdminServiceProviders';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />   
             <Route path="/login" element={<Login />} />
             <Route path="/admin" element={<Login />} />
<Route path='/adminDashboard' element={<AdminDashboard/>} />
<Route path="/adminCategories" element={<Category />} />
<Route path="/adminUsers" element={<AdminUsers />} />
<Route path="/adminServiceProviders" element={<AdminServiceProviders />} />


             <Route path="/signup" element={<Signup />} />
             <Route path="/aboutUs" element={<About />} />

             <Route path="/serviceProviderSignup" element={<ServiceProviderSignup />} />
             
             <Route path="/testimonials" element={<Testimonials />} />
             <Route path="/serviceProviderDashboard" element={<ServiceProviderDashboard />} />


      </Routes>
    </Router>
  );
};

export default App;
