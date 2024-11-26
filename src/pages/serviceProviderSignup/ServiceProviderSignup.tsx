import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "../Login/Login.css";
import image from "../../assets/blackTools.jpeg";

interface FormData {
  fullName: string;
  contactNumber: string;
  serviceCategory: string;
  yearsOfExperience: string;
  workingHours: string;
  certifications: string;
  languages: string[];
  education: {
    institute: string;
    year: string;
  };
  password: string;
  confirmPassword: string;
}

function ServiceProviderSignup() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    contactNumber: "",
    serviceCategory: "",
    yearsOfExperience: "",
    workingHours: "",
    certifications: "",
    languages: [],
    education: { institute: "", year: "" },
    password: "",
    confirmPassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        return {
          ...prev,
          languages: checked
            ? [...prev.languages, value]
            : prev.languages.filter((lang) => lang !== value),
        };
      } else if (name === "institute" || name === "year") {
        return {
          ...prev,
          education: {
            ...prev.education,
            [name]: value,
          },
        };
      } else {
        return {
          ...prev,
          [name]: value,
        };
      }
    });
  };

  return (
    <div
      className="signup-page"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div className="blur-overlay"></div>
      <div className="form-container container">
        <h2 className="mb-4 text-center">Signup</h2>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 col-12" onSubmit={submitSignup}>
            <div className="form-floating mb-3">
              <Form.Control
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="DefaultInput no-focus"
                value={formData.fullName}
                onChange={handleChange}
              />
              <Form.Label>Full Name</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                className="DefaultInput no-focus"
                value={formData.contactNumber}
                onChange={handleChange}
              />
              <Form.Label>Contact Number</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="text"
                name="serviceCategory"
                placeholder="Service Category"
                className="DefaultInput no-focus"
                value={formData.serviceCategory}
                onChange={handleChange}
              />
              <Form.Label>Service Category</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="text"
                name="yearsOfExperience"
                placeholder="Years of Experience"
                className="DefaultInput no-focus"
                value={formData.yearsOfExperience}
                onChange={handleChange}
              />
              <Form.Label>Years of Experience</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="text"
                name="workingHours"
                placeholder="Working Hours"
                className="DefaultInput no-focus"
                value={formData.workingHours}
                onChange={handleChange}
              />
              <Form.Label>Working Hours</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="text"
                name="certifications"
                placeholder="Certifications"
                className="DefaultInput no-focus"
                value={formData.certifications}
                onChange={handleChange}
              />
              <Form.Label>Certifications</Form.Label>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6 col-12">
          
            <Form.Group className="mb-3">
              <Form.Label>Languages Spoken</Form.Label>
              {["Malayalam", "English", "Hindi", "Tamil"].map((lang) => (
                <Form.Check
                  key={lang}
                  type="checkbox"
                  label={lang}
                  value={lang}
                  onChange={handleChange}
                />
              ))}
            </Form.Group>
            <div className="form-floating mb-3">
              <Form.Control
                type="text"
                name="institute"
                placeholder="Institute"
                className="DefaultInput no-focus"
                value={formData.education.institute}
                onChange={handleChange}
              />
              <Form.Label>Institute Name</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="number"
                name="year"
                placeholder="Year of Completion"
                className="DefaultInput no-focus"
                value={formData.education.year}
                onChange={handleChange}
              />
              <Form.Label>Year of Completion</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                className="DefaultInput no-focus"
                value={formData.password}
                onChange={handleChange}
              />
              <Form.Label>Password</Form.Label>
            </div>
            <div className="form-floating mb-3">
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="DefaultInput no-focus"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <Form.Label>Confirm Password</Form.Label>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Button className="DefaultButton w-50" variant="primary" type="submit">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ServiceProviderSignup;
