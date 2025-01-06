import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { User } from "../../types/user";
import image from "../../assets/blackTools.jpeg";

const Signup: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user: User | null = location.state?.user || null;

  const [formData, setFormData] = useState<User>({
    fullName: "",
    email: "",
    phone: "",
    address: { city: "", district: "", pin: "" },
    password: "",
    confirmPassword: "",
    whatsappNumber: "",
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        whatsappNumber: user.whatsappNumber || "",
        address: {
          city: user.address?.city || "",
          district: user.address?.district || "",
          pin: user.address?.pin || "",
        },
      });
    }
  }, [user]);

  const validatePassword = (password: string) => {
    setPasswordConditions({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "password") {
      validatePassword(value);
    }

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: addressField === "pin" ? parseInt(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    // Full Name Validation
  if (!formData.fullName) {
    errors.fullName = "Full Name is required.";
  } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
    errors.fullName = "Full Name must not contain numbers or special characters.";
  }

  // Email Validation
  if (!formData.email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Enter a valid email address (e.g., test@example.com).";
  }

  // Phone Number Validation
  if (!formData.phone) {
    errors.phone = "Phone Number is required.";
  } else if (!/^\d{10}$/.test(formData.phone)) {
    errors.phone = "Phone Number must be exactly 10 digits and contain no letters or special characters.";
  }

  // WhatsApp Number Validation
  if (!formData.whatsappNumber) {
    errors.whatsappNumber = "WhatsApp Number is required.";
  } else if (!/^\d{10}$/.test(formData.whatsappNumber)) {
    errors.whatsappNumber = "WhatsApp Number must be exactly 10 digits and contain no letters or special characters.";
  }

  // Password Validation (only for signup)
  if (!user) {
    if (!formData.password) {
      errors.password = "Password is required.";
    } else {
      const passwordConditions = {
        length: formData.password.length >= 6,
        uppercase: /[A-Z]/.test(formData.password),
        lowercase: /[a-z]/.test(formData.password),
        number: /\d/.test(formData.password),
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
      };

      if (!Object.values(passwordConditions).every(Boolean)) {
        errors.password = `
          Password must meet the following conditions`
      }
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }
  }

  // Address Validation
  if (!formData.address.city) errors["address.city"] = "City is required.";
  if (!formData.address.district) errors["address.district"] = "District is required.";
  if (!formData.address.pin) errors["address.pin"] = "Pin Code is required.";

  // If there are validation errors, set them in the state and stop submission
  if (Object.keys(errors).length > 0) {
    setFormErrors(errors);
    return;
  }

    try {
      if (user) {
        const response = await axios.post("/updateUserProfile", formData);
        if (response.status === 200) {
          navigate("/YourBookings");
        }
      } else {
        const response = await axios.post("/signup", formData);
        if (response.status === 201) {
          navigate("/login");
        }
      }
    } catch (error: any) {
      setFormErrors({ general: error.response?.data?.message || "Operation failed. Please try again." });
    }
  };

  return (
    <div
      className="signup-page"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="blur-overlay"></div>
      <div className="form-container p-2">
        <h2 className="text-center">{user ? "Edit Profile" : "Sign Up"}</h2>
        <Form className="signup-form p-3" onSubmit={handleSubmit}>
          {formErrors.general && <p className="errorMessageText text-center">{formErrors.general}</p>}

          {/* Full Name and Email */}
          <div className="row p-2">
            <div className="col-md-6">
              <Form.Group className="form-floating">
                <Form.Control
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="fullName">Full Name</Form.Label>
                {formErrors.fullName && <p className="errorMessageText">{formErrors.fullName}</p>}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="form-floating">
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="email">Email</Form.Label>
                {formErrors.email && <p className="errorMessageText">{formErrors.email}</p>}
              </Form.Group>
            </div>
          </div>

          {/* Phone Number and WhatsApp Number */}
          <div className="row p-2">
            <div className="col-md-6">
              <Form.Group className="form-floating">
                <Form.Control
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="phone">Phone Number</Form.Label>
                {formErrors.phone && <p className="errorMessageText">{formErrors.phone}</p>}
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="form-floating">
                <Form.Control
                  type="tel"
                  name="whatsappNumber"
                  id="whatsappNumber"
                  placeholder="WhatsApp Number"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="whatsappNumber">WhatsApp Number</Form.Label>
                {formErrors.whatsappNumber && (
                  <p className="errorMessageText">{formErrors.whatsappNumber}</p>
                )}
              </Form.Group>
            </div>
          </div>

          {/* City, District, and Pin Code */}
          <div className="row p-2">
            <div className="col-md-4">
              <Form.Group className="form-floating">
                <Form.Control
                  type="text"
                  name="address.city"
                  id="city"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="city">City</Form.Label>
                {formErrors["address.city"] && (
                  <p className="errorMessageText">{formErrors["address.city"]}</p>
                )}
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="form-floating">
                <Form.Control
                  type="text"
                  name="address.district"
                  id="district"
                  placeholder="District"
                  value={formData.address.district}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="district">District</Form.Label>
                {formErrors["address.district"] && (
                  <p className="errorMessageText">{formErrors["address.district"]}</p>
                )}
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="form-floating">
                <Form.Control
                  type="number"
                  name="address.pin"
                  id="pinCode"
                  placeholder="Pin Code"
                  value={formData.address.pin}
                  onChange={handleChange}
                />
                <Form.Label htmlFor="pinCode">Pin Code</Form.Label>
                {formErrors["address.pin"] && (
                  <p className="errorMessageText">{formErrors["address.pin"]}</p>
                )}
              </Form.Group>
            </div>
          </div>

          {/* Password and Confirm Password */}
          {!user && (
            <div className="row p-2">
              <div className="col-md-6">
                <Form.Group className="form-floating">
                  <Form.Control
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <Form.Label htmlFor="password">Password</Form.Label>
                  {formErrors.password && <p className="errorMessageText">{formErrors.password}</p>}
                  <div className="passwordCriteria">
                    <ul>
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
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="form-floating">
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <Form.Label htmlFor="confirmPassword">Confirm Password</Form.Label>
                  {formErrors.confirmPassword && (
                    <p className="errorMessageText">{formErrors.confirmPassword}</p>
                  )}
                </Form.Group>
              </div>
            </div>
          )}

          <div className="text-center">
            <Button className="DefaultButton" type="submit">{user ? "Edit Profile" : "Sign Up"}</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
