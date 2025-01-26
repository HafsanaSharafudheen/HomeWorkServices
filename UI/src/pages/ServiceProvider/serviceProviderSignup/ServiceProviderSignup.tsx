import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import image from "../../../assets/images/blackTools.jpeg";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch} from "react-redux";
import { AppDispatch } from "../../../../Redux/store";
import axios from "../../../utilities/axios";
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
    accountNumber:"",
    IFSCCode:""
  });

  const [formError, setFormError] = useState<string>("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const dispatch = useDispatch<AppDispatch>();
  const [loading,setLoading]=useState(false);

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
          case "accountNumber":
            case "IFSCCode":
          return {
            ...prev,
            [name]: value,
          };

        case "languages":
          return {
            ...prev,
            languages: checked
              ? [...prev.languages, value]
              : prev.languages?.filter((lang) => lang !== value),
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
  const handleValidation = () => {
    const errors: Record<string, string> = {};
  
    // Full Name
    if (!formData.fullName) {
      errors.fullName = "Full Name is required.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      errors.fullName = "Full Name must not contain numbers or special characters.";
    }  
    // Email
    if (!formData.email) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }
  
    // Contact Number
    if (!formData.contactNumber) errors.contactNumber = "Contact Number is required.";
    else if (!/^\d{10}$/.test(formData.contactNumber)) {
      errors.contactNumber = "Enter a valid 10-digit contact number.";
    }
  
    // WhatsApp Number
    if (!formData.whatsappNumber) errors.whatsappNumber = "WhatsApp Number is required.";
    else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
      errors.whatsappNumber = "Enter a valid 10-digit WhatsApp number.";
    }
  
    // Address
    if (!formData.address?.city) errors["address.city"] = "City is required.";
    if (!formData.address?.district) errors["address.district"] = "District is required.";
    if (!formData.address?.pin) {
      errors["address.pin"] = "PIN Code is required.";
    } else if (!/^\d{6}$/.test(formData.address?.pin)) {
      errors["address.pin"] = "Enter a valid 6-digit PIN code.";
    }
  
    // Service Category
    if (!formData.serviceCategory) errors.serviceCategory = "Service Category is required.";
  
    // Languages
    if (formData.languages?.length === 0) errors.languages = "Select at least one language.";
  
    // Education
    if (!formData.education?.institute) {
      errors["education.institute"] = "Institute name is required.";
    }
    
    if (!formData.education?.year || formData.education.year < 1900 || formData.education.year > new Date().getFullYear()) {
      errors["education.year"] = "Enter a valid year of completion.";
    }
    
    // Years of Experience
    if (!formData.yearsOfExperience || formData.yearsOfExperience <= 0)
      errors.yearsOfExperience = "Years of Experience is required.";
  
    // Service Charge
    if (!formData.serviceCharge || formData.serviceCharge <= 0)
      errors.serviceCharge = "Service Charge is required.";
    if (!formData.serviceCategory) {
      errors.serviceCategory = "Service Category is required.";
    }
    
    if (!formData.workingHours?.start) {
      errors.workingHoursStart = "Working hours start time is required.";
    }
    
    if (!formData.workingHours?.end) {
      errors.workingHoursEnd = "Working hours end time is required.";
    }
    if (!formData.IFSCCode) {
      errors.IFSCCode = "IFSC Code is required.";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.IFSCCode)) {
      errors.IFSCCode = "Enter a valid 11-character IFSC Code.";
    }
  
    // Account Number
    if (!formData.accountNumber) {
      errors.accountNumber = "Account Number is required.";
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      errors.accountNumber = "Enter a valid bank account number (9-18 digits).";
    }
    if (
      formData.workingHours?.start &&
      formData.workingHours.end &&
      formData.workingHours.start >= formData.workingHours.end
    ) {
      errors.workingHoursEnd = "End time must be later than start time.";
    }
    
  
    // Password (Only for Signup Mode)
    if (mode !== "edit") {
      if (!formData.password) errors.password = "Password is required.";
      else if (
        !(
          formData.password.length >= 6 &&
          /[A-Z]/.test(formData.password) &&
          /[a-z]/.test(formData.password) &&
          /\d/.test(formData.password) &&
          /[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
        )
      ) {
        errors.password =
          "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.";
      }
      if (!Object.values(passwordConditions).every(Boolean)) {
        errors.password = `
          Password must meet the following conditions`
      }
  
      if (!formData.confirmPassword)
        errors.confirmPassword = "Confirm Password is required.";
      else if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "Passwords do not match.";
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signupStart());
    setLoading(true)

    if (!handleValidation()) {
     
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
        setLoading(false);
        navigate("/login");
      }
    } catch (error: any) {
      setLoading(false);
    
      if (error.response?.data?.error?.includes("WhatsApp number already exists")) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          whatsappNumber: "WhatsApp number already exists. Please use a different WhatsApp number.",
        }));
      }
    
      else if (error.response?.data?.error?.includes("duplicate key error") &&
      error.response?.data?.error?.includes("email")) {
    // Specific error for duplicate email
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      email: "Email already exists. Please use a different email.",
    })) 
  }
    
      dispatch(
        signupFailure(error.response?.data?.message || "Operation failed.")
      );
    }
  }    

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
        <h2 className="mb-4 headingStyle">
          {mode === "edit" ? "Edit Profile" : "Signup"}
        </h2>
        <Form onSubmit={handleSubmit}>
          {formError && (
            <p className="errorMessageText">{formError}</p>
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
                {formErrors.fullName && (
              <p  className="errorMessageText">{formErrors.fullName}</p>
            )}
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
                {formErrors.email && (
              <p className="errorMessageText">{formErrors.email}</p>
            )}
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
                {formErrors.contactNumber && (
              <p className="errorMessageText">{formErrors.contactNumber}</p>
            )}
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
                {formErrors.whatsappNumber && (
              <p className="errorMessageText">{formErrors.whatsappNumber}</p>
            )}
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
                  {formErrors["address.city"] && (
          <p className="errorMessageText">{formErrors["address.city"]}</p>
        )}
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
                  {formErrors["address.district"] && (
          <p className="errorMessageText">{formErrors["address.district"]}</p>
        )}
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
                  {formErrors["address.pin"] && (
          <p className="errorMessageText">{formErrors["address.pin"]}</p>
        )}
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
            {formErrors.languages && <p className="errorMessageText">{formErrors.languages}</p>}

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
                  {formErrors["education.institute"] && (
          <p className="errorMessageText">{formErrors["education.institute"]}</p>
        )}
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
                  {formErrors["education.year"] && (
          <p className="errorMessageText">{formErrors["education.year"]}</p>
        )}
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
                  {formErrors.yearsOfExperience && (
              <p className="errorMessageText">{formErrors.yearsOfExperience}</p>
            )}
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
                  {formErrors.workingHoursStart && (
          <p className="errorMessageText">{formErrors.workingHoursStart}</p>
        )}
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
                  {formErrors.workingHoursEnd && (
          <p className="errorMessageText">{formErrors.workingHoursEnd}</p>
        )}
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
                  {formErrors.serviceCharge && (
              <p className="errorMessageText">{formErrors.serviceCharge}</p>
            )}
                  
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
                {formErrors.serviceCategory && (
    <p className="errorMessageText">{formErrors.serviceCategory}</p>
  )}
              </div>
             
            </div>
           
            </Form.Group>

          {/* Password Fields */}
          <Form.Group>
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    hidden={mode === "edit"}
                  />
                  <Form.Label>Password</Form.Label>
                  {formErrors.password && (
                  <p className="errorMessageText">{formErrors.password}</p>
                )}
                </div>
                <ul className="passwordCriteria" hidden={mode==='edit'}>
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
              <div className="col-md-3 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    hidden={mode === "edit"}
                    
                  />
                  <Form.Label>Confirm Password</Form.Label>
                  {formErrors.confirmPassword && (
                  <p className="errorMessageText">{formErrors.confirmPassword}</p>
                )}
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="text"
                    name="accountNumber"
                    placeholder="Account Number"
                    value={formData.accountNumber}
                    onChange={handleChange}
                   
                    
                  />
                  <Form.Label>Account Number</Form.Label>
                  {formErrors.accountNumber && (
                  <p className="errorMessageText">{formErrors.accountNumber}</p>
                )}
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="form-floating">
                  <Form.Control
                    type="text"
                    name="IFSCCode"
                    placeholder="IFSC Code"
                    value={formData.IFSCCode}
                    onChange={handleChange}
                   
                    
                  />
                  <Form.Label>IFSC Code</Form.Label>
                  {formErrors.IFSCCode && (
                  <p className="errorMessageText">{formErrors.IFSCCode}</p>
                )}
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
                disabled={loading && Object.keys(formErrors).length === 0}
                >
               Sign Up
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
