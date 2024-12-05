import { useState,useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import image from "../../../assets/blackTools.jpeg";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../Redux/store";
import axios from "../../../axios/axios";
import { signupFailure, signupStart, signupSuccess } from "../../../../Redux/user/userSlice";
import { Provider } from "../../../types/provider";


function ServiceProviderSignup() {
  const location = useLocation();
  const mode = location.state?.mode 
  const profileId = location.state?.profileId 

  
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
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    console.log(mode)
    if (mode === "edit" && profileId) {
      const fetchProfile = async () => {
        try {
          const response = await axios.get(`/serviceProviderProfile?profileId=${profileId}`);
          if (response.status === 200) {
            setFormData(response.data);
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
  
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
  
        // Checkbox field for languages
        case "languages":
          return {
            ...prev,
            languages: checked
              ? [...prev.languages, value]
              : prev.languages.filter((lang) => lang !== value),
          };
  
        // Nested fields: Address
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
  
        // Nested fields: Working Hours
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
          console.warn(`Unhandled field: ${name}`, e.target);
          return prev;
      }
    });
  };
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signupStart());

    if (
      !formData.fullName || !formData.serviceCharge||
      !formData.email ||
      !formData.contactNumber || !formData.whatsappNumber ||
      !formData.serviceCategory ||  !formData.confirmPassword||
      !formData.yearsOfExperience || !formData.password||
      !formData.workingHours.start || !formData.workingHours.end
     
     
    ) {
      setFormError("All fields are required.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      if (mode === "create") {
        const response = await axios.post("/providerSignup", formData);
        if (response.status === 201) {
          console.log(response.data)
          dispatch(signupSuccess(response.data));
          navigate("/login");
        }
      } else if (mode === "edit" && profileId) {
        const response = await axios.post(`/updateProfile`, formData);
        if (response.status === 200) {
          dispatch(signupSuccess(response.data));
          navigate("/ServiceProfile");
        }
      }
    } catch (error: any) {
      setFormError(error.response?.data?.message || "Operation failed. Please try again.");
      dispatch(signupFailure(error.response?.data?.message || "Operation failed."));
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
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
                <Form.Label>Contact Number</Form.Label>
              </div>
              <div className="form-floating mb-3">
                <Form.Control
                  type="text"
                  name="whatsappNumber"
                  placeholder="WhatsApp Number"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                />
                <Form.Label>WhatsApp Number</Form.Label>
              </div>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <div className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    name="address.city"
                    placeholder="City"
                    value={formData.address.city}
                    onChange={handleChange}
                  />
                  <Form.Label>City</Form.Label>
                </div>
                <div className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    name="address.district"
                    placeholder="District"
                    value={formData.address.district}
                    onChange={handleChange}
                  />
                  <Form.Label>District</Form.Label>
                </div>
                <div className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    name="address.pin"
                    placeholder="PIN Code"
                    value={formData.address.pin}
                    onChange={handleChange}
                  />
                  <Form.Label>PIN Code</Form.Label>
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Working Hours</Form.Label>
                <div className="row">
                  <div className="col-6">
                    <Form.Control
                      type="time"
                      name="workingHours.start"
                      placeholder="Start Time"
                      value={formData.workingHours.start}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <Form.Control
                      type="time"
                      name="workingHours.end"
                      placeholder="End Time"
                      value={formData.workingHours.end}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Form.Group>
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
                    name="languages"

                    onChange={handleChange}
                  />
                ))}
              </Form.Group>
              <div className="form-floating mb-3">
                <Form.Control
                  type="text"
                  name="education.institute"
                  placeholder="Institute"
                  value={formData.education.institute}
                  onChange={handleChange}
                />
                <Form.Label>Institute Name</Form.Label>
            </div>

              <div className="form-floating mb-3">
                <Form.Control
                  type="number"
                  name="education.year"
                  placeholder="Year of Completion"
                  value={formData.education.year}
                  onChange={handleChange}
                />
                <Form.Label>Year of Completion</Form.Label>
              </div>
              <div className="mb-3">
                <Form.Label>Service Category</Form.Label>
                <Form.Select
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrician">Electrician</option>
                  <option value="Carpentry">Carpentry</option>
                </Form.Select>
              </div>
              <div className="form-floating mb-3">
                <Form.Control
                  type="number"
                  name="yearsOfExperience"
                  placeholder="Years of Experience"
                  value={formData.yearsOfExperience}
                  onChange={handleChange}
                />
                <Form.Label>Years of Experience</Form.Label>
              </div>
              <div className="form-floating mb-3">
                <Form.Control
                  type="number"
                  name="serviceCharge"
                  placeholder="Service Charge"
                  value={formData.serviceCharge}
                  onChange={handleChange}
                />
                <Form.Label>Service Charge</Form.Label>
              </div>
              <div className="form-floating mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
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
