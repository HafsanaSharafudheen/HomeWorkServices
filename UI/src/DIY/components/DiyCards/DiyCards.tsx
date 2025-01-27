// import React from 'react';
import React from 'react';
import { DIY } from '../../../ServiceProvider/diy/types/diy';
import './DiyCards.css';
import { useNavigate } from 'react-router-dom';

interface DIYComponentProps {
  diy: DIY;
}

const DiyCards: React.FC<DIYComponentProps> = ({ diy }) => {
  const navigate=useNavigate()
  const handleViewDetails = () => {
    navigate('/diyDetails', { state: { diy } }); 
  };
  return (
    <div className="diy-show p-3">
    <img
  className="show-img-top diy-show-img"
  src={
    diy.photos && diy.photos.length > 0
      ? `${import.meta.env.VITE_API_BASEURL}/${diy.photos[0]}`
      : 'placeholder-image-url.jpg' // Provide a fallback placeholder image
  }
  alt={diy.ditTitle || 'DIY'}
/>

      <div className="show-body mt-2">
        <h5 className="show-title">{diy.ditTitle}</h5>
        <p className="show-text">{diy.purpose}</p>
        <button onClick={handleViewDetails} className="btn btn-primary btn-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default DiyCards;



