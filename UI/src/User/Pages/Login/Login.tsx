import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signupStart, signupSuccess, signupFailure } from "../../../../Redux/user/userSlice";
import { useNavigate, Link } from 'react-router-dom';
import "./Login.css";
import axios from "../../../utilities/axios";
import { RootState } from '../../../../Redux/store';
import Swal from 'sweetalert2';
 const image = "../../../../public/images/blackTools.jpeg";

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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email && !formData.password) {
      setError("Email and Password are required.");
      return;
    }
  
    if (!formData.email) {
      setError("Email is required.");
      return;
    }
  
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format. Please enter a valid email.");
      return;
    }
  
    if (!formData.password) {
      setError("Password is required.");
      return;
    }
    try {
      const response = await axios.post("/login", formData);
      dispatch(signupStart());


      const user = response.data.user;
      if (user.isBlocked ) {
        Swal.fire({
          title: "Account Blocked",
          text: "Your account is blocked. Please contact support for assistance.",
          icon: "error",
          confirmButtonText: "OK",
        });
        dispatch(signupFailure("User is blocked"));
        return;
      }
  
      // Check for redirect data in localStorage
      const redirectData = localStorage.getItem("redirectAfterLogin");
      if (redirectData) {
        const parsedData = JSON.parse(redirectData);
        navigate(`/providers`, { state: parsedData });
        localStorage.removeItem("redirectAfterLogin");
      }
      else if (user.isProvider) {
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
      const errorMessage = err.response.data.error;
      ;
      if (errorMessage === "User not found") {
        setError("User not found. Please check your email.");
      } else if (errorMessage === "Invalid credentials") {
        setError("Invalid password. Please try again.");
      } else {
        setError(errorMessage);
      }
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
          <div className="text-end mt-3">
  <Link to="/forgot-password" className="text-primary" style={{ fontSize: "12px" }}>
    Forgot your password?
  </Link>
</div>

          <div className="text-center">
  <Button className="DefaultButton" variant="primary" type="submit">
    Login
  </Button>
</div>

<div className="text-center mt-3">
  <Link
    to={{
      pathname: "/signup",
      state: { user },
    }}
    className="text-muted"style={{fontSize:"12px"}}
  >
    Not a member? <span className="text-primary">Sign up</span>
  </Link>
</div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
