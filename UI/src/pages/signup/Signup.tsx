import  { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from '../../axios/axios'
import "../Login/Login.css";
import image from "../../assets/blackTools.jpeg";
import { signupStart, signupSuccess, signupFailure } from "../../../Redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";

interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
const navigate=useNavigate()
  const { loading, error } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signupStart());
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.password) {
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
        navigate('/login')
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
        <h2 className="mb-4 text-center">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
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
              type="email"
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
              name="phone"
              placeholder="Phone Number"
              className="DefaultInput no-focus"
              value={formData.phone}
              onChange={handleChange}
            />
            <Form.Label>Phone Number</Form.Label>
          </div>

          <div className="form-floating mb-3">
            <Form.Control
              as="textarea"
              name="address"
              placeholder="Address"
              className="DefaultInput no-focus"
              rows={3}
              value={formData.address}
              onChange={handleChange}
            />
            <Form.Label>Address</Form.Label>
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

          <Button
            className="DefaultButton"
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
