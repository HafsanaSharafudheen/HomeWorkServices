import React, { useState, useEffect } from 'react';
import ServiceSidebar from '../serviceSidebar';
import ServiceNavbar from '../ServiceNavbar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store';
import axios from '../../../axios/axios';

function ServiceProfile() {
  const [profile, setProfile] = useState(null);
  const [serviceCharges, setServiceCharges] = useState({
    basicPayment: '',
    emergencyPayment: '',
    onsiteCharge: '',
    advancedCharge: ''
  });
  const [isChargesFormVisible, setIsChargesFormVisible] = useState(false);

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await axios.get('/serviceProviderProfile');
        if (response.status === 200) {
          setProfile(response.data.profile);
          if (!response.data.profile.serviceCharges) {
            setIsChargesFormVisible(true);
          }
        } else {
          alert('Failed to fetch profile details');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to fetch profile details');
      }
    };
    fetchProfileDetails();
  }, []);

  // Handle service charge form input change
  const handleChargeChange = (e) => {
    const { name, value } = e.target;
    setServiceCharges({ ...serviceCharges, [name]: value });
  };

  // Save service charges to the database
  const saveServiceCharges = async () => {
    try {
      const response = await axios.post('/api/service-provider/service-charges', serviceCharges);
      if (response.status === 200) {
        alert('Service charges updated successfully');
        setProfile({ ...profile, serviceCharges }); 
        setIsChargesFormVisible(false); 
      } else {
        alert('Failed to save service charges');
      }
    } catch (error) {
      console.error('Error saving service charges:', error);
      alert('Failed to save service charges');
    }
  };

  return (
    <div>
      <ServiceNavbar />

      <div className="row">
        <div className="col-md-3">
          <ServiceSidebar />
        </div>

        <div className="col-md-9">
          <div className="container p-4">
            {profile ? (
              <div>
                <div className="row">
                  <div className="col-md-6">
                    <h4>Personal Details</h4>
                    <p><strong>Name:</strong> {profile.fullName}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Phone:</strong> {profile.phone}</p>
                    <p><strong>Address:</strong> {profile.address}</p>
                    <p><strong>Languages Spoken:</strong> {profile.languages}</p>
                  </div>

                  <div className="col-md-6">
                    <h4>Service Details</h4>
                    <p><strong>Category:</strong> {profile.serviceCategory}</p>
                    <p><strong>Experience:</strong> {profile.experience} years</p>
                    <p><strong>Education:</strong> {profile.education}</p>
                    <p><strong>Availability:</strong> {profile.availability}</p>
                    <p><strong>Certifications:</strong> {profile.certifications}</p>

                    {/* Display service charges or show form if not available */}
                    {profile.serviceCharges ? (
                      <div>
                        <h4>Service Charges</h4>
                        <p><strong>Basic Payment:</strong> {profile.serviceCharges.basicPayment}</p>
                        <p><strong>Emergency Payment:</strong> {profile.serviceCharges.emergencyPayment}</p>
                        <p><strong>Onsite Charge:</strong> {profile.serviceCharges.onsiteCharge}</p>
                        <p><strong>Advanced Service Charge:</strong> {profile.serviceCharges.advancedCharge}</p>
                      </div>
                    ) : (
                      isChargesFormVisible && (
                        <div>
                          <h4>Enter Service Charges</h4>
                          <form onSubmit={(e) => { e.preventDefault(); saveServiceCharges(); }}>
                            <div className="form-group">
                              <label>Basic Payment</label>
                              <input
                                type="number"
                                className="form-control"
                                name="basicPayment"
                                value={serviceCharges.basicPayment}
                                onChange={handleChargeChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Emergency Payment</label>
                              <input
                                type="number"
                                className="form-control"
                                name="emergencyPayment"
                                value={serviceCharges.emergencyPayment}
                                onChange={handleChargeChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Onsite Visit Charge</label>
                              <input
                                type="number"
                                className="form-control"
                                name="onsiteCharge"
                                value={serviceCharges.onsiteCharge}
                                onChange={handleChargeChange}
                                required
                              />
                            </div>
                            <div className="form-group">
                              <label>Advanced Service Charge</label>
                              <input
                                type="number"
                                className="form-control"
                                name="advancedCharge"
                                value={serviceCharges.advancedCharge}
                                onChange={handleChargeChange}
                                required
                              />
                            </div>
                            <button type="submit" className="btn btn-success mt-3">Save Service Charges</button>
                          </form>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p>Loading profile...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceProfile;
