import React from 'react';
import './ServiceProvider.css';
import increaseEarnings from '../../assets/Earnings.jpg'
import productivity from '../../assets/worker-walking-along-gears-different-sizes_1156-608.avif'
import enhanceSkill from '../../assets/enhancing.avif'
import { useNavigate } from 'react-router-dom';
const ServiceProvider = () => {
  const navigate=useNavigate();

  return (
    <div className="service-provider-container">
     <div className="service-provider-header">
  <div className="header-content">
    <h2>Are You a Service Provider?</h2>
    <p>Unlock greater earnings, enhance productivity, and reach your full potential.</p>
  </div>
  <button className="DefaultButton"onClick={()=>navigate('/serviceProviderSignup')} >Join With Us</button>
</div>


      <div className="service-provider-content">
        <div className="service-item">
          <img src={increaseEarnings} alt="Increase Your Earnings" />
          <div>
            <h4>Increase Your Earnings</h4>
            <p>Access insights and strategies to unlock new revenue streams and maximize profitability.</p>
          </div>
        </div>

        <div className="service-item">
          <img src={productivity} alt="Improve Productivity" />
          <div>
            <h4>Improve Productivity</h4>
            <p>Utilize proven tools and methods to optimize workflows, allowing you to accomplish more in less time.</p>
          </div>
        </div>

        <div className="service-item">
          <img src={enhanceSkill} alt="Enhance Skill Development" />
          <div>
            <h4>Enhance Skill Development</h4>
            <p>Build and sharpen the essential skills you need to excel in your career.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;
