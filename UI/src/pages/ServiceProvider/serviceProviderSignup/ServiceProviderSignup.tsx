import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import image from "../../../assets/blackTools.jpeg";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Redux/store";
import axios from "../../../axios/axios";
import {
  signupFailure,
  signupStart,
  signupSuccess,
} from "../../../../Redux/user/userSlice";
import { Provider } from "../../../types/provider";

function ServiceProviderSignup() {
  const location = useLocation();
  const mode = location.state?.mode;
  const profileId = location.state?.profileId;

  const [formData, setFormData] = useState<Provider>({
    email: "",
    fullName: "",
    contactNumber: "",
    serviceCategory: "",
    yearsOfExperience: 0,
    workingHours: { start: "", end: "" },
    certifications: "",
    languages: [],
    education: { institute: "", year: 0 },
    password: "",
    confirmPassword: "",
    serviceCharge: 0,
    address: { city: "", district: "", pin: "" },
    whatsappNumber: "",
  });

  const [formError, setFormError] = useState<string>("");

  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && profileId) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(
            `/serviceProviderProfile?profileId=${profileId}`
          );
          if (response.status === 200) {
            const profileData = response.data.profile;
            setFormData(profileData);
          }
        } catch (error) {
          console.error("Failed to fetch profile data:", error);
          setFormError("Failed to load profile data. Please try again.");
        }
      };
      fetchProfile();
    }
  }, [mode, profileId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, checked } = e.target;

    if (name === "password") {
      validatePassword(value);
    }

    setFormData((prev) => {
      switch (name) {
        case "fullName":
        case "email":
        case "contactNumber":
        case "whatsappNumber":
        case "serviceCategory":
        case "yearsOfExperience":
        case "serviceCharge":
        case "password":
        case "confirmPassword":
          return {
            ...prev,
            [name]: value,
          };

        case "languages":
          return {
            ...prev,
            languages: checked
              ? [...prev.languages, value]
              : prev.languages.filter((lang) => lang !== value),
          };

        case "address.city":
          return {
            ...prev,
            address: {
              ...prev.address,
              city: value,
            },
          };
        case "address.district":
          return {
            ...prev,
            address: {
              ...prev.address,
              district: value,
            },
          };
        case "address.pin":
          return {
            ...prev,
            address: {
              ...prev.address,
              pin: value,
            },
          };

        case "workingHours.start":
          return {
            ...prev,
            workingHours: {
              ...prev.workingHours,
              start: value,
            },
          };
        case "workingHours.end":
          return {
            ...prev,
            workingHours: {
              ...prev.workingHours,
              end: value,
            },
          };
          
        case "education.institute":
          return {
            ...prev,
            education: {
              ...prev.education,
              institute: value,
            },
          };
        case "education.year":
          return {
            ...prev,
            education: {
              ...prev.education,
              year: value,
            },
          };

        default:
          return prev;
      }
    });
  };

  const validatePassword = (password: string) => {
    setPasswordConditions({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleEditProfile = async () => {
    dispatch(signupStart());

    try {
      const response = await axios.post(`/updateProfile`, formData);
      if (response.status === 200) {
        dispatch(signupSuccess(response.data.profile));
        navigate("/ServiceProfile");
      }
    } catch (error: any) {
      setFormError(
        error.response?.data?.message || "Operation failed. Please try again."
      );
      dispatch(
        signupFailure(
          error.response?.data?.message || "Operation failed."
        )
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signupStart());

    if (
      !formData.fullName ||
      !formData.serviceCharge ||
      !formData.email ||
      !formData.contactNumber ||
      !formData.whatsappNumber ||
      !formData.serviceCategory ||
      !formData.confirmPassword ||
      !formData.yearsOfExperience ||
      !formData.password ||
      !formData.workingHours.start ||
      !formData.workingHours.end
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
      setFormError(
        error.response?.data?.message || "Operation failed. Please try again."
      );
      dispatch(
        signupFailure(
          error.response?.data?.message || "Operation failed."
        )
      );
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
        <h2 className="mb-4 text-center">
          {mode === "edit" ? "Edit Profile" : "Signup"}
        </h2>
        <Form onSubmit={handleSubmit}>
          {formError && (
            <p className="text-danger text-center">{formError}</p>
          )}
          {/* Full Name and Email */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <Form.Label>Full Name</Form.Label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Label>Email</Form.Label>
              </div>
            </div>
          </div>

          {/* Phone Number and WhatsApp Number */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <Form.Control
                  type="tel"
                  name="contactNumber"
                  placeholder="Phone Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
                <Form.Label>Phone Number</Form.Label>
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <div className="form-floating">
                <Form.Control
                  type="tel"
                  name="whatsappNumber"
                  placeholder="WhatsApp Number"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                />
                <Form.Label>WhatsApp Number</Form.Label>
              </div>
            </div>
          </div>

          {/* Address */}
          <Form.Group>
            <Form.Label>Address</Form.Label>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="text"
                    name="address.city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                  <Form.Label>City</Form.Label>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="text"
                    name="address.district"
                    placeholder="District"
                    value={formData.address.district}
                    onChange={handleChange}
                  />
                  <Form.Label>District</Form.Label>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="text"
                    name="address.pin"
                    placeholder="PIN Code"
                    value={formData.address.pin}
                    onChange={handleChange}
                  />
                  <Form.Label>PIN Code</Form.Label>
                </div>
              </div>
            </div>
          </Form.Group>

          {/* Languages */}
          <Form.Group>
            <Form.Label>Languages Known</Form.Label>
            <div className="d-flex flex-wrap">
              {["Malayalam", "English", "Hindi", "Tamil"].map((lang) => (
                <Form.Check
                  key={lang}
                  type="checkbox"
                  label={lang}
                  value={lang}
                  name="languages"
                  className="me-3"
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>

          {/* Education */}
          <Form.Group>
            <Form.Label>Education</Form.Label>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="text"
                    name="education.institute"
                    placeholder="Institute"
                    value={formData.education.institute}
                    onChange={handleChange}
                  />
                  <Form.Label>Institute</Form.Label>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="number"
                    name="education.year"
                    placeholder="Year of Completion"
                    value={formData.education.year}
                    onChange={handleChange}
                  />
                  <Form.Label>Year of Completion</Form.Label>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="text"
                    name="yearsOfExperience"
                    placeholder="yearsOfExperience"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                  />
                  <Form.Label>Experience</Form.Label>
                </div>
              </div>
            </div>
          </Form.Group>

          {/* Working Hours */}
          <Form.Group>
            <Form.Label>Working Hours</Form.Label>
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="time"
                    name="workingHours.start"
                    placeholder="Start Time"
                    value={formData.workingHours.start}
                    onChange={handleChange}
                  />
                  <Form.Label>Start Time</Form.Label>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="time"
                    name="workingHours.end"
                    placeholder="End Time"
                    value={formData.workingHours.end}
                    onChange={handleChange}
                  />
                  <Form.Label>End Time</Form.Label>
                </div>
              </div>
            
        

        
              <div className="col-md-3 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="number"
                    name="serviceCharge"
                    placeholder="Service Charge"
                    value={formData.serviceCharge}
                    onChange={handleChange}
                  />
                  <Form.Label>Service Charge</Form.Label>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <Form.Select
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpentry">Carpentry</option>
                </Form.Select>
              </div>
            </div>
          
            </Form.Group>

          {/* Password Fields */}
          <Form.Group>
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={mode === "edit"}
                  />
                  <Form.Label>Password</Form.Label>
                </div>
                <ul className="passwordCriteria">
                  <li style={{ color: passwordConditions.length ? "green" : "black" }}>
                    At least 6 characters
                  </li>
                  <li style={{ color: passwordConditions.uppercase ? "green" : "black" }}>
                    At least one uppercase letter
                  </li>
                  <li style={{ color: passwordConditions.lowercase ? "green" : "black" }}>
                    At least one lowercase letter
                  </li>
                  <li style={{ color: passwordConditions.number ? "green" : "black" }}>
                    At least one number
                  </li>
                  <li style={{ color: passwordConditions.specialChar ? "green" : "black" }}>
                    At least one special character
                  </li>
                </ul>
              </div>
              <div className="col-md-6 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    disabled={mode === "edit"}
                  />
                  <Form.Label>Confirm Password</Form.Label>
                </div>
              </div>
            </div>
          </Form.Group>

          {/* Submit Button */}
          <div className="text-center mt-4">
            {mode === "edit" ? (
              <Button
                className="DefaultButton"
                variant="primary"
                type="button"
                disabled={loading}
                onClick={handleEditProfile}
              >
                {loading ? "Saving..." : "Edit Profile"}
              </Button>
            ) : (
              <Button
                className="DefaultButton"
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            )}
          </div>
        </Form>
        <div className="text-center mt-3">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ServiceProviderSignup;
