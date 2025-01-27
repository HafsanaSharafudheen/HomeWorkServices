import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number; // The rating value (e.g., 4.5)
  totalReviews?: number; // Optional: number of reviews
  showRatingText?: boolean; // Optional: Show rating text like "4.5 / 5"
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  totalReviews,
  showRatingText = true,
}) => {
  const maxStars = 5; // Total number of stars
  const fullStars = Math.floor(rating); // Number of fully filled stars
  const hasHalfStar = rating % 1 !== 0; // Check if there's a half star
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Render full stars */}
      {Array.from({ length: fullStars }, (_, index) => (
        <FaStar key={`full-${index}`} style={{ color: "gold", marginRight: "2px" }} />
      ))}
      {/* Render half star if applicable */}
      {hasHalfStar && <FaStarHalfAlt style={{ color: "gold", marginRight: "2px" }} />}
      {/* Render empty stars */}
      {Array.from({ length: emptyStars }, (_, index) => (
        <FaRegStar key={`empty-${index}`} style={{ color: "gold", marginRight: "2px" }} />
      ))}
      {showRatingText && (
        <span style={{ marginLeft: "8px" }}>
          {rating.toFixed(1)} / 5
        </span>
      )}
      {totalReviews !== undefined && (
        <span style={{ marginLeft: "8px", color: "gray" }}>
          ({totalReviews} reviews)
        </span>
      )}
    </div>
  );
};

export default StarRating;
