import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from '../../axios/axios';
import { User } from '../../types/user';
import {
  FaEdit,
  FaSignOutAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';
import './Profile.css';
import defaultImage from '../../assets/images/DefaultImage.avif';
import { logout } from '../../../Redux/user/userSlice';

function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch user details on component mount
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

  // Handle file change and upload
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];

      setIsUploading(true);

      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      try {
        const response = await axios.post('/upload-profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        alert(response.data.message);

        // Update the user state with the new profile picture
        setUser((prevUser) => {
          if (prevUser) {
            return { ...prevUser, profilePicture: response.data.filePath };
          }
          return prevUser;
        });
      } catch (error: any) {
        alert(error.response?.data?.error || 'An error occurred while uploading');
      } finally {
        setIsUploading(false);
      }
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post('/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    }

    dispatch(logout());
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  // Handle edit profile
  const handleEditProfile = () => {
    navigate('/signup', { state: { user } });
  };

  return (
    <div className="profile-header position-relative">
      {/* Background Section */}
      <div className="profile-background"></div>

      <div>
        {/* Profile Image */}
        <div className="text-center">
        <div
  className="profile-img-container"
  onClick={() => document.getElementById('fileInput')?.click()}
  style={{ cursor: 'pointer' }}
>
  <img
    src={
      user?.profilePicture
        ? `${import.meta.env.VITE_API_BASEURL}${user.profilePicture}`
        : defaultImage
    }
    alt="Profile"
    className={`rounded-circle profile-img ${isUploading ? 'uploading' : ''}`}
  />
  {isUploading && (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  )}
</div>
<input
  type="file"
  id="fileInput"
  style={{ display: 'none' }}
  accept="image/*"
  onChange={handleFileChange}
/>

        </div>

        {/* User Information */}
        <div className="mainContainer">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <h4 className="user-name">{user?.fullName || 'Loading...'}</h4>
              <div className="user-detail d-flex justify-content-start align-items-center">
                <FaEnvelope className="me-2 text-warning" size={15} />
                <p className="detail-text">{user?.email || 'Email N/A'}</p>
              </div>
              <div className="user-detail d-flex justify-content-start align-items-center">
                <FaWhatsapp className="me-2 text-success" size={15} />
                <p className="detail-text">{user?.whatsappNumber || 'N/A'}</p>
              </div>
              <div className="user-detail d-flex justify-content-start align-items-center">
                <FaPhone className="me-2 text-primary" size={15} />
                <p className="detail-text">{user?.phone || 'N/A'}</p>
              </div>
              <div className="user-detail d-flex justify-content-start align-items-start">
                <FaMapMarkerAlt className="me-2 text-danger" size={15} />
                <div>
                  <p className="detail-text d-block">
                    {user?.address?.city || 'City N/A'},{' '}
                    {user?.address?.district || 'District N/A'}
                    {user?.address?.pin ? ` , ${user.address.pin}` : ' Pin Code N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="row mt-3 justify-content-center">
            <div className="col-md-6 text-center mb-5">
              <div className="d-inline-flex gap-3">
                <button
                  className="btn-primary"
                  onClick={handleEditProfile}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <FaEdit className="me-2" /> Edit Profile
                </button>
                <button
                  className="btn-warning"
                  onClick={handleLogout}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  <FaSignOutAlt className="me-2" /> Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
