import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "../../utilities/axios";
import './ProviderBookings.css'
interface UpdateWorkProgressProps {
  bookingId: string;
  onClose: () => void;
  fetchBookings: () => void;
}

const UpdateWorkProgress: React.FC<UpdateWorkProgressProps> = ({
  bookingId,
  onClose,
  fetchBookings,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "photos" | "videos"
  ) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      if (type === "photos") {
        const newPreviews = selectedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setPhotos((prev) => [...prev, ...selectedFiles]);
        setPhotoPreviews((prev) => [...prev, ...newPreviews]);
      } else if (type === "videos") {
        const newPreviews = selectedFiles.map((file) =>
          URL.createObjectURL(file)
        );
        setVideos((prev) => [...prev, ...selectedFiles]);
        setVideoPreviews((prev) => [...prev, ...newPreviews]);
      }
    }
  };

  const handleFileRemove = (index: number, type: "photos" | "videos") => {
    if (type === "photos") {
      setPhotos((prev) => prev.filter((_, i) => i !== index));
      setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
    } else if (type === "videos") {
      setVideos((prev) => prev.filter((_, i) => i !== index));
      setVideoPreviews((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleWorkUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();

    photos.forEach((photo) => formData.append("photos", photo));
    videos.forEach((video) => formData.append("videos", video));

    formData.append("title", title);
    formData.append("description", description);
    formData.append("bookingId", bookingId);

    try {
      await axios.post(`/updateWorkDetails`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchBookings(); // Refresh bookings after update
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating work details:", error);
    }
  };

  return (
    <div className="update-modal-overlay">
      <div className="update-modal-container">
        <div className="modal-header">
          <h5>Update Work Progress</h5>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="update-modal-body">
          <form onSubmit={handleWorkUpdate}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Work Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <label htmlFor="title">Work Title</label>
            </div>

            <div className="form-floating mb-3">
              <textarea
                className="form-control"
                id="description"
                placeholder="Description"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <label htmlFor="description">Description</label>
            </div>

            {/* File Upload for Photos */}
            <div className="file-upload-container">
              <label className="upload-label">
                <div className="upload-box">
                  <p>Click to Upload Photos</p>
                </div>
                <input
                  type="file"
                  multiple
                  className="upload-input"
                  onChange={(e) => handleFileChange(e, "photos")}
                />
              </label>
              <div className="file-preview-container">
                {photoPreviews.map((preview, index) => (
                  <div key={index} className="file-preview">
                    <img src={preview} alt={`Preview ${index}`} className="preview-image" />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleFileRemove(index, "photos")}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* File Upload for Videos */}
            <div className="file-upload-container">
              <label className="upload-label">
                <div className="upload-box">
                  <p>Click to Upload Videos</p>
                </div>
                <input
                  type="file"
                  multiple
                  className="upload-input"
                  onChange={(e) => handleFileChange(e, "videos")}
                />
              </label>
              <div className="file-preview-container">
                {videoPreviews.map((preview, index) => (
                  <div key={index} className="file-preview">
                    <video src={preview} controls className="preview-image" />
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleFileRemove(index, "videos")}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateWorkProgress;
