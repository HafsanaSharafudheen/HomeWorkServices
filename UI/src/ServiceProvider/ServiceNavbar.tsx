import './serviceProvider.css'
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
const logo = '../../public/logo.jpg'
const ServiceNavbar = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="row Servicenavbar align-items-center p-3">
        <div className="col-md-6">
        <div className="logo">
        <img src={logo} alt="Logo" style={{ height: "60px" }} />

    </div>
        </div>
        <div className="col-md-6">
        <div className="user-details">
        <p>Welcome, {user?.fullName}</p>
        <small>Your journey to excellence begins here.</small>
      </div>
        </div>
    </div>
    
    
      
    
  );
};

export default ServiceNavbar;
