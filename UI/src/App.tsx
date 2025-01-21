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
import ProviderBookings from './pages/ServiceProvider/ProviderBookings/ProviderBookings';
import DiyForm from './pages/ServiceProvider/diy/diyForm';
import ForgotPassword from './components/forgotPassword/ForgotPassword';
import ResetPassword from './components/forgotPassword/ResetPassword';
import Chat from './components/chat/Chat';
import ChatList from './components/ChatList/ChatList';
import AdminProfile from './pages/admin/adminProfile/adminProfile';
import PageNotFound from './components/PageNotFound/PageNotFound';
import DiyPage from './pages/DIYPage/DiyPage';
import DiyDetails from './pages/DiyDetails/DiyDetails';
import PaymentConfirmation from './pages/PaymentConfirmation/PaymentConfirmation';
import AdminBookings from './pages/admin/adminBookings/AdminBookings';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/messages" element={<Chat />} />
        <Route path="/YourChats" element={<ChatList isProvider={false} />} />
        <Route path="/providerChats" element={<ChatList isProvider={true} />} />
        
        <Route path="/admin" element={<Login />} />
        <Route path='/adminDashboard' element={<AdminDashboard />} />
        <Route path="/adminCategories" element={<Category />} />
        <Route path="/adminUsers" element={<AdminUsers />} />
        <Route path="/adminProfile" element={<AdminProfile />} />

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
        <Route path="*" element={<PageNotFound />} />
        <Route path="/DIY" element={<DiyPage />} />
        <Route path="/diyDetails" element={<DiyDetails/>} />
        <Route path="/paymentConfirmation" element={<PaymentConfirmation/>} />


      </Routes>
    </Router>
  );
};

export default App;
