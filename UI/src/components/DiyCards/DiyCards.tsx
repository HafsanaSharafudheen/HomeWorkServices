import React from 'react';
import { DIY } from '../../types/diy';


interface DIYComponentProps {
  diy: DIY;
}

const DiyCards: React.FC<DIYComponentProps> = ({ diy }) => {
  return (
    <div className="row">
        <div className="col-md-12">
        <div className="diy-component">
      <h1>{diy.ditTitle}</h1>
      <h2>Category: {diy.category}</h2>
      <p>
        <strong>Purpose:</strong> {diy.purpose}
      </p>

      <h3>Materials Required:</h3>
      <ul>
        {diy.materialsRequired.map((material, index) => (
          <li key={index}>{material}</li>
        ))}
      </ul>

      <h3>Steps:</h3>
      <ol>
        {diy.steps.map((step, index) => (
          <li key={index}>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>

      <h3>Safety Tips:</h3>
      <ul>
        {diy.safetyTips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>

      <h3>Additional Notes:</h3>
      <p>{diy.additionalNotes}</p>

      <h3>Images:</h3>
      <div className="image-gallery">
        {diy.photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`DIY step ${index + 1}`}
            style={{ width: '150px', height: '150px', margin: '5px' }}
          />
        ))}
      </div>

      <h3>Videos:</h3>
      <div className="video-gallery">
        {diy.vedios.map((video, index) => (
          <video
            key={index}
            controls
            style={{ width: '300px', height: '200px', margin: '5px' }}
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
      </div>
    </div>
        </div>
    </div>
    
  );
};

export default DiyCards;
