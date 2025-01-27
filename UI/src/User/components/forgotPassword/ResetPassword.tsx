import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "../../../utilities/axios";
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(`/reset-password/${token}`, { password });
      navigate("/login", { state: { message: "Password reset successful!" } });
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="forgotPage-container" >
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Label>New Password</Form.Label>
        </div>
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
