import React from "react";
import { Button, Form } from "react-bootstrap";
import "../Login/Login.css";
import image from "../../assets/blackTools.jpeg";

function Signup() {
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
        <Form>
          {/* Full Name Field */}
          <div className="form-floating mb-3">
            <Form.Control
              type="text"
              id="floatingFullName"
              placeholder="Full Name"
              className="DefaultInput no-focus"
            />
            <Form.Label htmlFor="floatingFullName">Full Name</Form.Label>
          </div>

          {/* Email Field */}
          <div className="form-floating mb-3">
            <Form.Control
              type="email"
              id="floatingEmail"
              placeholder="Email"
              className="DefaultInput no-focus"
            />
            <Form.Label htmlFor="floatingEmail">Email</Form.Label>
          </div>

        
          {/* Phone Number Field */}
          <div className="form-floating mb-3">
            <Form.Control
              type="tel"
              id="floatingPhone"
              placeholder="Phone Number"
              className="DefaultInput no-focus"
            />
            <Form.Label htmlFor="floatingPhone">Phone Number</Form.Label>
          </div>

          {/* Address Field */}
          <div className="form-floating mb-3">
            <Form.Control
              as="textarea"
              id="floatingAddress"
              placeholder="Address"
              className="DefaultInput no-focus"
              rows={3}
            />
            <Form.Label htmlFor="floatingAddress">Address</Form.Label>
          </div>
  {/* Password Field */}
  <div className="form-floating mb-3">
            <Form.Control
              type="password"
              id="floatingPassword"
              placeholder="Password"
              className="DefaultInput no-focus"
            />
            <Form.Label htmlFor="floatingPassword">Password</Form.Label>
          </div>

          {/* Confirm Password Field */}
          <div className="form-floating mb-3">
            <Form.Control
              type="password"
              id="floatingConfirmPassword"
              placeholder="Confirm Password"
              className="DefaultInput no-focus"
            />
            <Form.Label htmlFor="floatingConfirmPassword">
              Confirm Password
            </Form.Label>
          </div>

          {/* Submit Button */}
          <Button
            className="DefaultButton w-100"
            variant="primary"
            type="submit"
          >
            Sign Up
          </Button>

          {/* Already a Member */}
          <div className="text-center mt-3">
            <a href="/login" className="text-muted">
              Already a member? <span className="text-primary">Login</span>
            </a>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
