import React, { useEffect, useState } from "react";

import { DIY } from "../../../types/diy";
import ServiceSidebar from "../ServiceSidebar";
import ServiceNavbar from "../ServiceNavbar";
import imagePath from "../../../assets/diy.jpg";
import { FaPlusCircle, FaRegImage, FaVideo } from "react-icons/fa";
import './diyForm.css'
import axios from "../../../axios/axios";
import PreviousDIY from "../../../components/diy/PreviousDIY";
 export const DIYForm: React.FC = () => {


  const [formData, setFormData] = useState<{
    ditTitle: string;
    purpose: string;
    materialsRequired: string[];
    steps: { title: string; description: string }[];
    category: string;
    safetyTips: string;
    additionalNotes: string;
    photos: File[] | string[];
    videos: File[] | string[];
  }>({
    ditTitle: "",
    purpose: "",
    materialsRequired: [],
    steps: [{ title: "", description: "" }],
    category: "",
    safetyTips: "",
    additionalNotes: "",
    photos: [],
    videos: [],
  });


   

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

  const handleSubmit = async (e: React.FormEvent) => {
    
    e.preventDefault(); // Prevent default form submission
    console.log("Submit button clicked! Form data: ", formData); // Debugging log

    if (!formData.ditTitle || !formData.purpose || !formData.category) {
      alert("Please fill out all required fields!");
      return;
    }

    try {
      console.log("Submitting form data...");
      await axios.post("/createDIY", formData);
      alert("DIY Tip submitted successfully!");
      setFormData({
        ditTitle: "",
        purpose: "",
        materialsRequired: [],
        steps: [{ title: "", description: "" }],
        category: "",
        safetyTips: "",
        additionalNotes: "",
        photos: [],
        videos: [],
      });
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
                <h5 className="cardTitle mt-5">Share Your DIY Tips and Explore Others</h5>
                <p className="cardText">Contribute your knowledge or get inspired by creative and practical DIY solutions shared by others!</p>
              </div>
            </div>

          </div>

          <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
            <h1 className="headingStyle">Submit Your DIY Tip</h1>
            <h5 className="text-primary mb-4">1. Title and Purpose</h5>
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
              </div>
            </div>

            <h5 className="text-primary">2. Step-by-Step Instructions</h5>
            {formData.steps.map((step, index) => (
              <div key={index} className="row g-3 mb-3 align-items-center">
                <div className="col-md-5">
                  <label className="form-label fw-bold">Step Title</label>
                  <input
                    type="text"
                    className="form-control"
                    value={step.title}
                    onChange={(e) => handleStepChange(index, "title", e.target.value)}
                    placeholder={`Step ${index + 1} Title`}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Step Description</label>
                  <textarea
                    className="form-control"
                    value={step.description}
                    onChange={(e) =>
                      handleStepChange(index, "description", e.target.value)
                    }
                    placeholder={`Step ${index + 1} Description`}
                  ></textarea>
                </div>
                <div className="col-md-1">
                  {index === formData.steps.length - 1 && (
                    <button
                      type="button"
                      className="btn btn-link text-primary"
                      onClick={handleAddStep}
                      style={{ fontSize: "20px" }}
                    >
                      <FaPlusCircle />
                    </button>
                  )}
                </div>
              </div>
            ))}

            <h5 className="text-primary">3. Tags/Category</h5>
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
              </div>
              <div className="col-md-12">
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
              </div>
            </div>

            <div className="text-center mt-4">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: "#8B5E3C",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  border: "none",
                }}
              >
                Submit
              </button>
            </div>
          </form>


        <div>
          <PreviousDIY/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default DIYForm;
