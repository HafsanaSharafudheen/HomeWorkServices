import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './User/Pages/Login/Login';
import Signup from './User/Pages/signup/Signup';
import About from './User/components/About/About';
import AdminServiceProviders from './admin/adminServices/page/AdminServiceProviders';
import ServiceProviderDashboard from './ServiceProvider/ServiceProviderDashboard/ServiceProviderDashboard';
import ServiceProviderSignup from './ServiceProvider/serviceProviderSignup/ServiceProviderSignup';
import ServiceProfile from './ServiceProvider/ServiceProfile/ServiceProfile';
import ProviderBookings from './ServiceProvider/ProviderBookings/ProviderBookings';
import DiyForm from './ServiceProvider/diy/diyForm';
import ForgotPassword from './User/components/forgotPassword/ForgotPassword';
import ResetPassword from './User/components/forgotPassword/ResetPassword';
import ChatList from './Chat/page/ChatList/ChatList';
import AdminProfile from './admin/adminProfile/page/adminProfile';
import PageNotFound from './User/Pages/PageNotFound/PageNotFound';
import DiyPage from './DIY/pages/DIYPage/DiyPage';
import DiyDetails from './DIY/pages/DiyDetails/DiyDetails';
import PaymentConfirmation from './User/Pages/PaymentConfirmation/PaymentConfirmation';
import AdminBookings from './admin/adminBookings/page/AdminBookings';
import Profile from './User/Pages/Profile/Profile';
import AdminDashboard from './admin/adminDashboard/page/AdminDashboard';
import Category from './admin/adminCategory/page/Category';
import AdminUsers from './admin/adminUsers/page/AdminUsers';
import Home from './User/Pages/Home';
import Bookings from './User/Pages/UserBookings/Bookings';
import Testimonials from './Reviews/page/TestimonialsPage/Testimonials';
import ServicesDetails from './User/Pages/servicesDetailedPage/page/servicesDetails';
import Chat from './Chat/page/chat/Chat';
import Dashboard from './ServiceProvider/ServiceProviderDashboard/Dashboard';


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
        <Route path="/profile" element={<Profile />} />

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
        <Route path="/mydash" element={<Dashboard/>} />


      </Routes>
    </Router>
  );
};

export default App;
