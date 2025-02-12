import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "../../../utilities/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const validatePassword = (password) => {
    setPasswordConditions({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!Object.values(passwordConditions).every(Boolean)) {
      setError("Password does not meet all requirements.");
      return;
    }

    try {
      await axios.post(`/reset-password/${token}`, { password });
      navigate("/login", { state: { message: "Password reset successful!" } });
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="forgotPage-container">
      <div className="forgot-container">
        <h2 className="mb-4 text-center">Reset Password</h2>
        {error && <p className="text-danger text-center">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your new password"
              className="DefaultInput no-focus"
              value={password}
              onChange={handlePasswordChange}
            />
            <Form.Label>New Password</Form.Label>
          </div>
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
          <div className="form-floating mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm your new password"
              className="DefaultInput no-focus"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Form.Label>Confirm Password</Form.Label>
          </div>
          <div className="text-center">
            <Button className="DefaultButton" variant="primary" type="submit">
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
