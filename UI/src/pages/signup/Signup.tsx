import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../../axios/axios";
import "../Login/Login.css";
import image from "../../assets/blackTools.jpeg";
import { signupStart, signupSuccess, signupFailure } from "../../../Redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import { User } from "../../types/user";

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<User>({
    fullName: "",
    email: "",
    phone: "",
    address: { city: "", district: "", pin: '' },
    password: "",
    confirmPassword: "",
    whatsappNumber: "",
  });

  const [formError, setFormError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

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

    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signupStart());
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.whatsappNumber ||
      !formData.address.city ||
      !formData.address.district ||
      !formData.address.pin ||
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
      const response = await axios.post("/signup", formData);

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
      }}
    >
      <div className="blur-overlay"></div>
      <div className="form-container">
        <h2 className="text-center">Sign Up</h2>
        <Form className="signup-form" onSubmit={handleSubmit}>
          {formError && <p className="text-danger text-center">{formError}</p>}

          <div className="row">
            <div className="col-md-6">
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
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="DefaultInput no-focus"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Form.Label>Email</Form.Label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="DefaultInput no-focus"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <Form.Label>Phone Number</Form.Label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Form.Control
                  type="tel"
                  name="whatsappNumber"
                  placeholder="WhatsApp Number"
                  className="DefaultInput no-focus"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                />
                <Form.Label>WhatsApp Number</Form.Label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Form.Control
                  type="text"
                  name="address.district"
                  placeholder="District"
                  className="DefaultInput no-focus"
                  value={formData.address.district}
                  onChange={handleChange}
                />
                <Form.Label>District</Form.Label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Form.Control
                  type="number"
                  name="address.pin"
                  placeholder="Pin Code"
                  className="DefaultInput no-focus"
                  value={formData.address.pin}
                  onChange={handleChange}
                />
                <Form.Label>Pin Code</Form.Label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-floating mb-3">
                <Form.Control
                  type="text"
                  name="address.city"
                  placeholder="City"
                  className="DefaultInput no-focus"
                  value={formData.address.city}
                  onChange={handleChange}
                />
                <Form.Label>City</Form.Label>
              </div>
            </div>
            <div className="col-md-6">
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
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
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

          <Button
            className="DefaultButton w-100"
            variant="primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
          <div className="text-center mt-3">
            <a href="/login" className="text-muted">
              Already a member? <span className="text-primary">Login</span>
            </a>
          </div>
          {error && <p className="text-danger text-center mt-3">{error}</p>}
        </Form>
      </div>
    </div>
  );
};

export default Signup;
