import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Signup from './pages/signup/Signup';
import Testimonials from './pages/TestimonialsPage/Testimonials';
import About from './components/About/About';
import Category from './pages/admin/adminCategory/Category';
import AdminDashboard from './pages/admin/adminDashboard/AdminDashboard'
import AdminUsers from './pages/admin/adminUsers/AdminUsers';
import AdminServiceProviders from './pages/admin/adminServices/AdminServiceProviders';
import ServiceProviderDashboard from './pages/ServiceProvider/ServiceProviderDashboard/ServiceProviderDashboard';
import ServiceProviderSignup from './pages/ServiceProvider/serviceProviderSignup/ServiceProviderSignup';
import ServiceProfile from './pages/ServiceProvider/ServiceProfile/ServiceProfile';
import ServicesDetails from './pages/servicesDetailedPage/servicesDetails';
import Bookings from './pages/UserBookings/Bookings';
import Profile from './pages/Profile/Profile';
import AdminBookings from './pages/admin/adminBookings/adminBookings';
import ProviderBookings from './pages/ServiceProvider/ProviderBookings/ProviderBookings';
import diyForm from './pages/ServiceProvider/diy/diyForm';
import DiyForm from './pages/ServiceProvider/diy/diyForm';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Login />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path="/adminCategories" element={<Category />} />
        <Route path="/adminUsers" element={<AdminUsers />} />
        <Route path="/adminBookings" element={<AdminBookings />} />

        <Route path="/adminServiceProviders" element={<AdminServiceProviders />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/aboutUs" element={<About />} />
        <Route path="/YourBookings" element={<Bookings />} />
        
       

        <Route path="/serviceProviderSignup" element={<ServiceProviderSignup />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/serviceProviderDashboard" element={<ServiceProviderDashboard />} />
        <Route path="/ProviderBookings" element={<ProviderBookings />} />

        <Route path="/providers" element={<ServicesDetails />} />
        <Route path="/diyhub" element={<DiyForm />} />

        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path='/ServiceProfile' element={<ServiceProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
