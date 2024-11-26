import { useNavigate } from "react-router-dom";
import "../App.css";
import HeroImage from '../assets/HeroImage.jpg';

const HeroSection: React.FC = () => {
const navigate=useNavigate()
;  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        {/* Left Column */}
        <div className="col-md-6">
          <h1 className="animate__animated animate__fadeInLeft">
            Find Reliable Home Services <br /> Anytime, Anywhere
          </h1>

          <p className="mt-3 text-muted animate__animated animate__fadeInRight">
            Convenient, trusted services at your doorstep—exactly when you need them. We make home services easy for you. Whether it's a repair, installation, or maintenance task, we bring expert help directly to your door. You can book trusted professionals anytime, wherever you need work done quickly and at your convenience, all with just a few clicks.
          </p>
          <button className="DefaultButton mt-3" onClick={()=>navigate('/login')}>
           
              Book Your Service 
          </button>
        </div>

        {/* Right Column */}
        <div className="col-md-6 text-center">
          <img
           src={HeroImage}
            alt="Service Providers"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
