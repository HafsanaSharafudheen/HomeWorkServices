import './ServiceProvider.css';
import increaseEarnings from '../../assets/images/Earnings.jpg';
import productivity from '../../assets/images/worker-walking-along-gears-different-sizes_1156-608.avif';
import enhanceSkill from '../../assets/images/enhancing.avif';
import { useNavigate } from 'react-router-dom';

const ServiceProvider = () => {
  const navigate = useNavigate();
 

  return (
    <div className="container service-provider-container">
      {/* Header Section */}
      <div className="row service-provider-header align-items-center">
        <div className="col-md-6">
          <div className="header-content">
            <h2>Are You a Service Provider?</h2>
            <p>Unlock greater earnings, enhance productivity, and reach your full potential.</p>
          </div>
        </div>
        <div className="col-md-6 text-center text-md-end">
          <button
            className="DefaultButton w-md-auto"
            onClick={() => navigate('/serviceProviderSignup', { state: { mode: "create" } })}
            >
            Join With Us
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="row mt-5 service-provider-content">
        {/* Service Item 1 */}
        <div className="col-md-6 mb-4">
          <div className="service-item">
            <img src={increaseEarnings} alt="Increase Your Earnings" className="img-fluid" />
            <div>
              <h4>Increase Your Earnings</h4>
              <p>
                Access insights and strategies to unlock new revenue streams and maximize
                profitability.
              </p>
            </div>
          </div>
        </div>

        {/* Service Item 2 */}
        <div className="col-md-6 mb-4">
          <div className="service-item">
            <img src={productivity} alt="Improve Productivity" className="img-fluid" />
            <div>
              <h4>Improve Productivity</h4>
              <p>
                Utilize proven tools and methods to optimize workflows, allowing you to accomplish
                more in less time.
              </p>
            </div>
          </div>
        </div>

        {/* Service Item 3 */}
        <div className="col-md-6 mb-4">
          <div className="service-item">
            <img src={enhanceSkill} alt="Enhance Skill Development" className="img-fluid" />
            <div>
              <h4>Enhance Skill Development</h4>
              <p>
                Build and sharpen the essential skills you need to excel in your career.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvider;
