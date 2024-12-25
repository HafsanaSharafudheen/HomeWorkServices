import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axios/axios';
import { User } from '../../types/user';
import { FaEdit, FaSignOutAlt, FaWhatsapp, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './Profile.css';
import defaultImag from '../../assets/person.jpg';
import { logout } from '../../../Redux/user/userSlice';

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('/fetchUserDetails');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleEditProfile = () => {
    navigate('/signup', { state: { user } });
  };

  const handleLogout = () => {
   
    dispatch(logout());

    navigate('/login');
  };

  return (
    <div className="container">
      <div className="profile-header position-relative">
        {/* Background Section */}
        <div className="profile-background"></div>

        {/* Profile Image */}
        <img
          src={user?.image || defaultImag}
          alt="Profile"
          className="rounded-circle profile-img"
        />

        
         {/* User Details */}
        <div className="row mt-4 justify-content-center">
          <div className="col-md-6 text-center mt-3">
            <h4 className="user-name mb-2">{user?.fullName || 'Loading...'}</h4>
            <div className="user-detail d-flex justify-content-start align-items-center mb-3">
              <FaEnvelope className="me-3 text-secondary" size={15} />
              <p className="detail-text">{user?.email || 'Email N/A'}</p>
            </div>
            <div className="user-detail d-flex justify-content-start align-items-center mb-3">
              <FaWhatsapp className="me-3 text-success" size={15} />
              <p className="detail-text">{user?.whatsappNumber || 'N/A'}</p>
            </div>

            <div className="user-detail d-flex justify-content-start align-items-center mb-3">
              <FaPhone className="me-3 text-primary" size={15} />
              <p className="detail-text">{user?.phone || 'N/A'}</p>
            </div>

            <div className="user-detail d-flex justify-content-start align-items-start mb-3">
              <FaMapMarkerAlt className="me-3 text-danger" size={15} />
              <div>
                <p className="detail-text d-block">
                  {user?.address?.city || 'City N/A'}
                </p>
                <p className="detail-text d-block">
                  {user?.address?.district || 'District N/A'}
                </p>
                <p className="detail-text d-block">
                  {user?.address?.pin ? `Pin: ${user.address.pin}` : 'Pin Code N/A'}
                </p>
              </div>
            </div>

           
          </div>
        </div>  

        {/* Action Buttons */}
        <div className="row mt-3 justify-content-center">
          <div className="col-md-6 text-center">
            <button className="btn btn-danger me-3" onClick={handleEditProfile}>
              <FaEdit className="me-2" /> Edit Profile
            </button>
            <button className="btn btn-danger" onClick={handleLogout}>
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
