import { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import "../Login/Login.css";
import image from "../../../assets/blackTools.jpeg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../../../Redux/store';
import axios from "../../../axios/axios";
import { signupFailure, signupStart, signupSuccess } from "../../../../Redux/user/userSlice";


interface FormData {
  email:string,
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
    email:'',
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
  const [formError, setFormError] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.user);

const navigate=useNavigate()
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
 // Handle form submission
 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  dispatch(signupStart())

  if (
    !formData.fullName ||  !formData.email ||
    !formData.contactNumber ||
    !formData.serviceCategory ||
    !formData.yearsOfExperience ||
    !formData.workingHours ||
    !formData.password
  ) {
    setFormError("All fields are required.");
    return;
  }
  if (formData.password !== formData.confirmPassword) {
    setFormError("Passwords do not match.");
    return;
  }
 
 
  try {
    const response = await axios.post("/providerSignup", formData);
    if (response.status === 201) {
      dispatch(signupSuccess(response.data));

      navigate("/login");
    }
    
  } catch (error: any) {

    setFormError(error.response?.data?.message || "Sign up failed. Please try again.");
    dispatch(signupFailure(error.response?.data?.message || "Sign up failed."));

  }
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
      <div className="form-SignupContainer container">
        <h2 className="mb-4 text-center">Signup</h2>
        <Form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6 col-12">
         
          {formError && <p className="text-danger text-center">{formError}</p>}
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
                type="text"
                name="email"
                placeholder="Email"
                className="DefaultInput no-focus"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Label>Email</Form.Label>
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
        <Button
            className="DefaultButton w-100"
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </div>
        </Form>
      </div>
    </div>
  );
}

export default ServiceProviderSignup;
