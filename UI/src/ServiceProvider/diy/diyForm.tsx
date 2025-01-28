import React, { useRef, useState, lazy, Suspense } from "react";
import { DIY } from "./types/diy";
import { FaPlusCircle, FaRegImage, FaTimesCircle, FaVideo } from "react-icons/fa";
import "./diyForm.css";
import axios from "../../utilities/axios";
import Swal from "sweetalert2";
import { useCategories } from "./hooks/useCategories";
import ProviderSidebar from '../Sidebar/Sidebar';

const PreviousDIY = lazy(() => import("../../DIY/components/diy/PreviousDIY"));
const ServiceNavbar = lazy(() => import("../ServiceNavbar"));
const ServiceSidebar = lazy(() => import("../serviceSidebar"));

export const DIYForm: React.FC = () => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreviews, setVideoPreviews] = useState<string[]>([]);


  const [formData, setFormData] = useState<Omit<DIY, "_id" | "providerId">>({
    ditTitle: "",
    purpose: "",
    materialsRequired: [],
    steps: [{ title: "", description: "" }],
    category: "",
    safetyTips: [],
    additionalNotes: "",
    photos: [],
    vedios: [],
  });


  
  const [errors, setErrors] = useState<Record<string, string>>({});


  const  {categories, loading, error} = useCategories();

  
  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { title: "", description: "" }],
    });
  };

  const handleStepChange = (index: number, field: "title" | "description", value: string) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index][field] = value;
    setFormData({ ...formData, steps: updatedSteps });
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = formData.steps.filter((_, stepIndex) => stepIndex !== index);
    setFormData({ ...formData, steps: updatedSteps });
  };

  const validateDIYForm = (formData: Omit<DIY, "_id" | "providerId">): boolean => {
    const validationErrors: Record<string, string> = {};

    if (!formData.ditTitle.trim()) {
      validationErrors.ditTitle = "Title is required.";
    }

    if (!formData.purpose.trim()) {
      validationErrors.purpose = "Purpose/Overview is required.";
    }

    if (formData.materialsRequired.length === 0) {
      validationErrors.materialsRequired = "At least one material is required.";
    }

    formData.steps.forEach((step, index) => {
      if (!step.title.trim()) {
        validationErrors[`steps.${index}.title`] = `Step ${index + 1} title is required.`;
      }
      if (!step.description.trim()) {
        validationErrors[`steps.${index}.description`] = `Step ${index + 1} description is required.`;
      }
    });

    if (!formData.category.trim()) {
      validationErrors.category = "Category is required.";
    }

    if (formData.safetyTips.length === 0) {
      validationErrors.safetyTips = "At least one safety tip is required.";
    }

    if (!formData.additionalNotes.trim()) {
      validationErrors.additionalNotes = "Additional notes are required.";
    } else if (formData.additionalNotes.trim().length < 25) {
      validationErrors.additionalNotes = "Additional notes must be at least 25 characters long.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const handleIconClick = (type: "photos" | "videos") => {
    if (type === "photos" && photoInputRef.current) {
      photoInputRef.current.click();
    } else if (type === "videos" && videoInputRef.current) {
      videoInputRef.current.click();
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: "photos" | "videos"
  ) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
  
      if (type === "photos") {
        const newImagePreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newImagePreviews]);
  
        setFormData((prevData) => ({
          ...prevData,
          photos: [...prevData.photos, ...files], // Add selected files to formData.photos
        }));
      } else if (type === "videos") {
        const newVideoPreviews = files.map((file) => URL.createObjectURL(file));
        setVideoPreviews((prev) => [...prev, ...newVideoPreviews]);
  
        setFormData((prevData) => ({
          ...prevData,
          vedios: [...prevData.vedios, ...files], // Add selected files to formData.videos
        }));
      }
    }
  };
  


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateDIYForm(formData)) {
      return;
    }

    const data = new FormData();
    data.append("ditTitle", formData.ditTitle);
    data.append("purpose", formData.purpose);
    data.append("materialsRequired", JSON.stringify(formData.materialsRequired));
    data.append("steps", JSON.stringify(formData.steps));
    data.append("category", formData.category);
    data.append("safetyTips", JSON.stringify(formData.safetyTips));
    data.append("additionalNotes", formData.additionalNotes);
    formData.photos.forEach((photo) => {
      data.append('photos', photo);
    });
  
    // Append videos
    formData.vedios.forEach((video) => {
      data.append('videos', video);
    })
    try {
      await axios.post("/createDIY", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      Swal.fire({
        icon: 'success',
        title: 'DIY Tip Submitted!',
        text: 'Your DIY tip has been submitted successfully.',
        confirmButtonColor: '#8B5E3C',
      });
        setFormData({
        ditTitle: "",
        purpose: "",
        materialsRequired: [],
        steps: [{ title: "", description: "" }],
        category: "",
        safetyTips: [],
        additionalNotes: "",
        photos: [],
        vedios: [],
      });
      setImagePreviews([]); // Clear image previews
    setVideoPreviews([]); // Clear video previews
      setErrors({});
    } catch (error) {
      console.error("Error submitting DIY:", error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed!',
        text: 'Failed to submit DIY Tip. Please try again.',
        confirmButtonColor: '#d33',
      });
        }
  };


  if (loading) {
    return <p>Loading categories...</p>; // Show this while fetching
  }
  
  if (error) {
    return <p className="text-danger">Error: {error}</p>; // Show this if fetching fails
  }

  return (
    <div>
      {/* Lazy Load Navbar */}
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <ServiceNavbar />
      </Suspense>
  
      {/* Sidebar and Main Content */}
      <div className="d-flex h-screen bg-gray-100">
        {/* Lazy Load Sidebar */}
        <Suspense fallback={<div>Loading Sidebar...</div>}>
          <ProviderSidebar />
        </Suspense>
  
        {/* Main Content Section */}
        <div className="flex-1 p-6 bg-white w-100">
          <div className="formContainer">
            <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
              <h1 className="headingStyle">Submit Your DIY Tip</h1>
              <h6 className="text-primary">1. Title and Purpose</h6>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.ditTitle}
                    onChange={(e) => setFormData({ ...formData, ditTitle: e.target.value })}
                    placeholder="Enter the title"
                  />
                  {errors.ditTitle && <p className="errorMessage">{errors.ditTitle}</p>}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Materials Required</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.materialsRequired.join(",")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        materialsRequired: e.target.value.split(","),
                      })
                    }
                    placeholder="List materials required"
                  />
                  {errors.materialsRequired && <p className="errorMessage">{errors.materialsRequired}</p>}
                </div>
                <div className="col-md-12">
                  <label className="form-label fw-bold">Purpose/Overview</label>
                  <textarea
                    className="form-control"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    placeholder="Briefly describe the purpose"
                    rows={3}
                  ></textarea>
                  {errors.purpose && <p className="errorMessage">{errors.purpose}</p>}
                </div>
              </div>

              <h6 className="text-primary mt-3">2. Step-by-Step Instructions</h6>
              {formData.steps.map((step, index) => (
                <div key={index} className="row g-3 align-items-center">
                  <div className="col-md-5">
                    <label className="form-label fw-bold">Step Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={step.title}
                      onChange={(e) => handleStepChange(index, "title", e.target.value)}
                      placeholder={`Step ${index + 1} Title`}
                    />
                    {errors[`steps.${index}.title`] && (
                      <p className="errorMessage">{errors[`steps.${index}.title`]}</p>
                    )}
                  </div>
                  <div className="col-md-5">
                    <label className="form-label fw-bold">Step Description</label>
                    <textarea
                      className="form-control"
                      value={step.description}
                      onChange={(e) => handleStepChange(index, "description", e.target.value)}
                      placeholder={`Step ${index + 1} Description`}
                    ></textarea>
                    {errors[`steps.${index}.description`] && (
                      <p className="errorMessage">{errors[`steps.${index}.description`]}</p>
                    )}
                  </div>
                  <div className="col-md-2 d-flex align-items-center">
                    {index !== 0 && (
                      <button
                        type="button"
                        className="btn btn-link text-danger"
                        onClick={() => handleRemoveStep(index)}
                        style={{ fontSize: "15px" }}
                      >
                        <FaTimesCircle />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-link text-primary"
                  onClick={handleAddStep}
                  style={{ fontSize: "10px" }}
                >
                  <FaPlusCircle /> Add Step
                </button>
              </div>

              <h6 className="text-primary">3. Tags/Category</h6>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Select Category</label>

                  <select
  className="form-select"
  value={formData.category}
  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
>
  <option value="">Select Category</option>
  {Array.isArray(categories) &&
    categories.map((category, index) => (
      <option key={index} value={category.categoryName}>
        {category.categoryName}
      </option>
    ))}
</select>

         
                  {errors.category && <p className="errorMessage">{errors.category}</p>}
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Safety Tips</label>
                  <textarea
                    className="form-control"
                    value={formData.safetyTips}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        safetyTips: e.target.value,
                      })
                    }
                    placeholder="Add safety precautions"
                    rows={3}
                  ></textarea>
                  {errors.safetyTips && <p className="errorMessage">{errors.safetyTips}</p>}
                </div>
                </div>



                <div className="col-md-12 mb-4">
                  <label className="form-label fw-bold">Additional Notes</label>
                  <textarea
                    className="form-control"
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      setFormData({ ...formData, additionalNotes: e.target.value })
                    }
                    placeholder="Add any additional notes"
                    rows={3}
                  ></textarea>
                  {errors.additionalNotes && <p className="errorMessage">{errors.additionalNotes}</p>}
                </div>

                <div className="row">
        {/* Image Upload Section */}
        <div className="col-md-6 uploadButton">
          <label>Upload Photos:</label>
          <FaRegImage onClick={() => handleIconClick("photos")} style={{ cursor: "pointer" ,fontSize:"30px"}} />
          <input
            type="file"
            accept="image/*"
            multiple
            ref={photoInputRef}
            onChange={(e) => handleFileChange(e, "photos")}
            style={{ display: "none" }}
          />
          <div className="preview-container">
            <div className="image-preview">
              {imagePreviews.map((src, index) => (
                <img key={index} src={src} alt="Preview" style={{ width: "100px", height: "100px", margin: "5px" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Video Upload Section */}
        <div className="col-md-6 uploadButton">
          <label>Upload Videos:</label>
          <FaVideo onClick={() => handleIconClick("videos")} style={{ cursor: "pointer" ,fontSize:"30px"}} />
          <input
            type="file"
            accept="video/*"
            multiple
            ref={videoInputRef}
            onChange={(e) => handleFileChange(e, "videos")}
            style={{ display: "none" }}
          />
          <div className="preview-container">
            <div className="video-preview">
              {videoPreviews.map((src, index) => (
                <video key={index} controls style={{ width: "150px", height: "100px", margin: "5px" }}>
                  <source src={src} type="video/mp4" />
                </video>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#8B5E3C",
                  color: "white",
                  borderRadius: "8px",
                  fontSize: "12px",
                  border: "none",
                }}
              >
                Submit
              </button>
            </div>
            </form>
          
            </div>

{/* Previous DIY Section */}
<Suspense fallback={<div>Loading Previous DIY...</div>}>
  <PreviousDIY />
</Suspense>
</div>
</div>
</div>
);
}

export default DIYForm;
