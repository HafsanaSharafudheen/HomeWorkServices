import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signupStart, signupSuccess, signupFailure } from "../../../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import image from "../../assets/blackTools.jpeg";
import axios from "../../axios/axios";
import { RootState } from '../../../Redux/store';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const user = useSelector((state: RootState) => state.user.user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signupStart());

    if (!formData.email || !formData.password) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await axios.post("/login", formData);
      dispatch(signupStart());
    
      const user = response.data.user;
    
      if (user.isProvider) {
        dispatch(signupSuccess(user));
        navigate("/serviceProviderDashboard");
      } else if (user.isAdmin) {
        dispatch(signupSuccess(user));
        navigate("/adminDashboard");
      } else {
        dispatch(signupSuccess(user));
        navigate("/");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      dispatch(signupFailure(errorMessage));
    }
    
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="blur-overlay"></div>
      <div className="form-container">
        <h2 className="mb-4 text-center">Login</h2>
        <Form onSubmit={handleSubmit}>
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="form-floating mb-3">
            <Form.Control
              type="text"
              name="email"
              placeholder="email"
              className="DefaultInput no-focus"
              value={formData.email}
              onChange={handleChange}
            />
            <Form.Label>Email</Form.Label>
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
          <Button
            className="DefaultButton w-100"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          <div className="text-center mt-3">
            <a href="/signup" className="text-muted">
              Not a member? <span className="text-primary">Sign up</span>
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
