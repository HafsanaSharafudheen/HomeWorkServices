import { useState } from "react";
import { FaStar, FaCloudUploadAlt, FaTimes } from "react-icons/fa";
import "./ReviewComponent.css"; // CSS styling
import axios from "../../utilities/axios";
import Swal from "sweetalert2";

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
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        (file) => file.type.startsWith("image/") || file.type.startsWith("video/")
      );

      if (files.length + selectedFiles.length > 15) {
        Swal.fire("Error", "You can upload up to 15 files in total.", "error");
        return;
      }

      const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
      setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    }
  };

  const handleFileRemove = (index: number) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];
    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const handleSubmit = async () => {
    if (!rating || !message) {
      Swal.fire({
        title: "Error",
        text: "Please provide a rating and message.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("providerId", providerId);
      formData.append("bookingId", bookingId);
      formData.append("ratings", rating.toString());
      formData.append("message", message);
      files.forEach((file) =>
        formData.append(file.type.startsWith("image/") ? "workImage" : "workVideo", file)
      );

      await axios.post("/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        title: "Success!",
        text: "Review submitted successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      Swal.fire({
        title: "Error",
        text: "Failed to submit review. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="Review-container">

    <div className="reviewComponent reviewCard p-4">
      <h5 className="mb-1 text-center">Leave a Review</h5>

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
        className="form-control mb-1"
        placeholder="Write your comment here..."
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></textarea>

      <label className="upload-label mb-1 d-flex align-items-center">
        <FaCloudUploadAlt className="me-2" size={20} />
        <input
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
        />
        Upload images or videos
      </label>

      <div className="file-preview-container mb-3">
        {previews.map((preview, index) => (
          <div key={index} className="file-preview">
            {files[index].type.startsWith("image/") ? (
              <img
                src={preview}
                alt={`Preview ${index}`}
                className="preview-image"
              />
            ) : (
              <video
                src={preview}
                controls
                className="preview-video"
              ></video>
            )}
            <button
              type="button"
              className="remove-button"
              onClick={() => handleFileRemove(index)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>

      <button className="btn btn-primary w-100" onClick={handleSubmit}>
        Submit Review
      </button>
    </div>
    </div>
  );
};

export default ReviewComponent;
