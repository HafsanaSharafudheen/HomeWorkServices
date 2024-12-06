import './serviceProvider.css'
import logo from '../../assets/logo.png'

const ServiceNavbar = () => {
  return (
    <div className="row  Servicenavbar align-items-center p-3">
        <div className="col-md-6">
        <div className="logo">
        <img src={logo} alt="Logo" style={{ height: "50px" }} />

    </div>
        </div>
        <div className="col-md-6">
        <div className="user-details">
        <p>Welcome, TO HOMEWORK</p>
        <small>Your journey to excellence begins here.</small>
      </div>
        </div>
    </div>
    
    
      
    
  );
};

export default ServiceNavbar;
