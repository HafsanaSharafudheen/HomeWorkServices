import { useState } from "react";
import { FaStar, FaCloudUploadAlt } from "react-icons/fa";
import "./ReviewComponent.css"; // CSS styling
import { Review } from "../../types/review";
import axios from "../../axios/axios";

interface ReviewProps {
    bookingId: string;
    providerId: string;
    onClose: () => void;
  }
  
  const ReviewComponent: React.FC<ReviewProps> = ({
    bookingId,
    providerId,
    onClose,
  }) => {
    const [rating, setRating] = useState<number>(0);
    const [message, setMessage] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("providerId", providerId);
      formData.append("bookingId", bookingId);
      formData.append("ratings", rating.toString());
      formData.append("message", message);
      if (file) formData.append("workImage", file);

      await axios.post("/reviews", formData); 

      alert("Review submitted successfully!");
      onClose();

    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="review-component card p-4">
      <h5 className="mb-3 text-center">Leave a Review</h5>

      <div className="rating mb-3 text-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`star ${rating >= star ? "filled" : ""}`}
            onClick={() => setRating(star)}
            size={24}
          />
        ))}
      </div>

      <textarea
        className="form-control mb-3"
        placeholder="Write your comment here..."
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <label className="upload-label mb-3 d-flex align-items-center">
        <FaCloudUploadAlt className="me-2" size={20} />
        <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
        {file ? file.name : "Upload an image or video"}
      </label>

      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
       
      >
       Submit Review
      </button>
    </div>
  );
}

export default ReviewComponent;
