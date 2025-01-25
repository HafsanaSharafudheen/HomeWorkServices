import React from 'react';
import { useLocation } from 'react-router-dom';
import defaultImage from '../../assets/images/DefaultImage.avif';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DiyDetails: React.FC = () => {
  const location = useLocation();
  const diy = location.state?.diy;

  if (!diy) {
    return <p>No DIY details available!</p>;
  }

  return (
    <>
    <Header/>
    <div className="container">
      <div className="row">
        {/* Left Column: DIY Image */}
        <div className="col-md-6">
          <img 
            src={
              diy.photos && diy.photos.length > 0
                ? `${import.meta.env.VITE_API_BASEURL}/${diy.photos[0]}`
                : defaultImage
            }
            alt={diy.ditTitle || 'DIY'}
            className="img-fluid rounded"
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
        </div>

        {/* Right Column: Provider Details and DIY Info */}
        <div className="col-md-6">
          {/* Provider Details */}
          <div className="diy-provider-details">
            <img 
              src={
                diy.providerDetails?.profilePicture
                  ? `${import.meta.env.VITE_API_BASEURL}/${diy.providerDetails.profilePicture}`
                  : defaultImage
              }
              alt={diy.providerDetails?.fullName || 'Provider'}
              className="img-fluid rounded-circle mb-3"
              style={{ width: '80px', height: '80px', objectFit: 'cover' }}
            />
            <h5>{diy.providerDetails?.fullName}</h5>
            <p>Email: {diy.providerDetails?.email}</p>
            <p>Phone: {diy.providerDetails?.contactNumber}</p>
          </div>
          </div>
          <hr />

<div className="row">
    <div className="col-md-12">

   
          {/* DIY Details */}
          <h6 className='headingStyle mt-3 mb-3'>{diy.ditTitle}</h6>
          <p>{diy.purpose}</p>
          <h4 className=''>Materials Required:</h4>
          <ul>
            {diy.materialsRequired.map((material, index) => (
              <li key={index}>{material}</li>
            ))}
          </ul>
           {/* Image Gallery */}
           <h4 className="diy-section-title">Image Gallery</h4>
          <div className="row diyImageGallery">
            {diy.photos && diy.photos.length > 0 ? (
              diy.photos.map((photo, index) => (
                <div className="col-md-4" key={index}>
                  <img
                    src={`${import.meta.env.VITE_API_BASEURL}/${photo}`}
                    alt={`DIY Image ${index + 1}`}
                    className="img-thumbnail"
                  />
                </div>
              ))
            ) : (
              <p>No images available</p>
            )}
          </div>

          {/* Video Gallery */}
          <h4 className="diy-section-title">Video Gallery</h4>
          <div className="row diy-video-gallery">
            {diy.vedios && diy.vedios.length > 0 ? (
              diy.vedios.map((video, index) => (
                <div className="col-md-4" key={index}>
                  <video controls autoPlay className="diy-video">
                    <source
                      src={`${import.meta.env.VITE_API_BASEURL}/${video}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ))
            ) : (
              <p>No videos available</p>
            )}
          </div>
          <h4>Steps:</h4>
          <ol>
            {diy.steps.map((step, index) => (
              <li key={index}>
                <h5>{step.title}</h5>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
          <h4>Safety Tips:</h4>
          <ul>
            {diy.safetyTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
          <h4>Additional Notes:</h4>
          <p>{diy.additionalNotes}</p>
        </div>
        </div>
        </div>
    
    </div>
    <Footer/>
    </>

  );
};

export default DiyDetails;
