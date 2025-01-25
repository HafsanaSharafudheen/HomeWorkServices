import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import "./ReviewDisplay.css";

interface ReviewDetails {
  ratings: number;
  message: string;
  workImage: string[];
  workVideo: string[];
}

interface ReviewDisplayProps {
  reviewDetails: ReviewDetails | null;
}

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({ reviewDetails }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (reviewDetails && reviewDetails.workImage.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % reviewDetails.workImage.length
        );
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [reviewDetails]);

  if (!reviewDetails) {
    return <p></p>;
  }

  return (
    <div className="review-container">
      <div className="review-wrapper">
        <div className="review-card">
          {/* Image Carousel */}
          {reviewDetails.workImage.length > 0 && (
            <div className="review-image">
              <img
                src={`${import.meta.env.VITE_API_BASEURL}/${reviewDetails.workImage[currentImageIndex]}`}
                alt={`Work Image ${currentImageIndex + 1}`}
                className="carousel-image"
              />
            </div>
          )}

          {/* Review Details */}
          <div className="review-text">
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={star <= reviewDetails.ratings ? "text-warning" : "text-secondary"}
                />
              ))}
            </div>
            <p className="review-message">{reviewDetails.message}</p>
          </div>

          {/* Videos */}
          {reviewDetails.workVideo.length > 0 && (
            <div className="review-name">
              <h6>Review Videos:</h6>
              <div className="video-section">
                {reviewDetails.workVideo.map((video, index) => (
                  <video
                    key={index}
                    src={`${import.meta.env.VITE_API_BASEURL}/${video}`}
                    controls
                    className="review-video"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewDisplay;
