import React, { useEffect, useState } from "react";

import { DIY } from "../../../types/diy";
import ServiceSidebar from "../ServiceSidebar";
import ServiceNavbar from "../ServiceNavbar";
import imagePath from "../../../assets/diy.jpg";
import { FaPlusCircle, FaRegImage, FaTimesCircle, FaVideo } from "react-icons/fa";
import './diyForm.css'
import axios from "../../../axios/axios";
import PreviousDIY from "../../../components/diy/PreviousDIY";


  export const DIYForm: React.FC = () => {
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

   

  // Add a new step dynamically
  const handleAddStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { title: "", description: "" }],
    });
  };

  // Update a specific step
  const handleStepChange = (index: number, field: "title" | "description", value: string) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index][field] = value;
    setFormData({ ...formData, steps: updatedSteps });
  };
  const validateDIYForm = (formData: Omit<DIY, "_id" | "providerId">): boolean => {
    const validationErrors: Record<string, string> = {};
  
    // Title Validation
    if (!formData.ditTitle.trim()) {
      validationErrors.ditTitle = "Title is required.";
    }
  
    // Purpose Validation
    if (!formData.purpose.trim()) {
      validationErrors.purpose = "Purpose/Overview is required.";
    }
  
    // Materials Required Validation
    if (formData.materialsRequired.length === 0) {
      validationErrors.materialsRequired = "At least one material is required.";
    }
  
    // Steps Validation
    formData.steps.forEach((step, index) => {
      if (!step.title.trim()) {
        validationErrors[`steps.${index}.title`] = `Step ${index + 1} title is required.`;
      }
      if (!step.description.trim()) {
        validationErrors[`steps.${index}.description`] = `Step ${index + 1} description is required.`;
      }
    });
  
    // Category Validation
    if (!formData.category.trim()) {
      validationErrors.category = "Category is required.";
    }
  
    // Safety Tips Validation
    if (formData.safetyTips.length === 0) {
      validationErrors.safetyTips = "At least one safety tip is required.";
    }
 // Trim the additionalNotes


// Check if additionalNotes is empty
if (!formData.additionalNotes.trim()) {
  validationErrors.additionalNotes = "Additional notes are required.";
} else if (formData.additionalNotes.trim().length < 25) {
  // Check if the length of additionalNotes is less than 25
  validationErrors.additionalNotes = "Additional notes must be at least 25 characters long.";
}


  
    // Update errors state
    setErrors(validationErrors);
  
    // Return true if no errors
    return Object.keys(validationErrors).length === 0;
  };
  

  const handleRemoveStep = (index: number) => {
    const updatedSteps = formData.steps.filter((_, stepIndex) => stepIndex !== index);
    setFormData({ ...formData, steps: updatedSteps });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    if (!validateDIYForm(formData)) {
      return; // Stop if validation fails
    }

    try {
      await axios.post("/createDIY", formData);
      alert("DIY Tip submitted successfully!");
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
      setErrors({}); // Clear errors after successful submission
    } catch (error) {
      console.error("Error submitting DIY:", error);
      alert("Failed to submit DIY Tip. Please try again.");
    }
  };

  return (
    <div>
      <ServiceNavbar />
      <div className="row">
        <div className="col-md-3">
          <ServiceSidebar />
        </div>
        <div className="col-md-9">
          <div className="text-white text-center">
            <div className="card text-white div-bg-image-1">
            
              <div className="card-img-overlay d-flex flex-column justify-content-center text-center">
                <h6 className="cardTitle mt-5">Share Your DIY Tips and Explore Others</h6>
                <p className="cardText">Contribute your knowledge or get inspired by creative and practical DIY solutions shared by others!</p>
              </div>
            </div>

          </div>
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
 {errors.materialsRequired && (
                <p className="errorMessage">{errors.materialsRequired}</p>
              )}
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
        onChange={(e) =>
          handleStepChange(index, "description", e.target.value)
        }
        placeholder={`Step ${index + 1} Description`}
      ></textarea>
      {errors[`steps.${index}.description`] && (
        <p className="errorMessage">{errors[`steps.${index}.description`]}</p>
      )}
    </div>
    <div className="col-md-2 d-flex align-items-center">
      {/* Remove Button */}
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
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Painting & Renovation">Painting & Renovation</option>
                  <option value="Appliance Maintenance">Appliance Maintenance</option>
                  <option value="Beauty Tips">Beauty Tips</option>
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
        <div>
          <PreviousDIY/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DIYForm;
