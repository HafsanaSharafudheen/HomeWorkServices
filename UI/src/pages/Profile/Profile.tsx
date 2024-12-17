import { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { User } from '../../types/user';
import { FaEdit, FaSignOutAlt, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import './Profile.css';
import defaultImag from '../../assets/person.jpg'
function Profile() {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <div className="container">
      <div className="profile-header position-relative">
        {/* Background Section */}
        <div className="profile-background"></div>

        {/* Profile Image */}
        {/* <div className="row justify-content-center"> */}
          {/* <div className="col-md-12 text-center position-relative"> */}
            <img
              src={user?.image || defaultImag}
              alt="Profile"
              className="rounded-circle profile-img"
            />
          {/* </div> */}
        {/* </div> */}

        {/* User Details */}
        <div className="row mt-5 justify-content-center">
          <div className="col-md-6 text-center mt-3">
            <h6 className="user-name">{user?.fullName || 'Loading...'}</h6>
            <div className="user-detail d-flex justify-content-center align-items-center mb-2">
              <FaWhatsapp className="me-2 text-success" />
              <span>{user?.whatsappNumber || 'N/A'}</span>
            </div>
            <div className="user-detail d-flex justify-content-center align-items-center mb-2">
              <FaMapMarkerAlt className="me-2 text-danger" />
              <span>
                {user?.address?.city}, {user?.address?.district}
                {user?.address?.pin && ` - ${user.address.pin}`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row mt-3 justify-content-center">
          <div className="col-md-6 text-center">
            <button className="btn btn-danger me-3">
              <FaEdit className="me-2" /> Edit Profile
            </button>
            <button className="btn btn-danger">
              <FaSignOutAlt className="me-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
