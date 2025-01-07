import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "../../axios/axios";
import Swal from "sweetalert2";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response = await axios.post("/forgot-password", { email });
      setMessage(response.data.message);
      Swal.fire({
        title: "Success",
        text: "Password reset link has been sent to your email.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className="forgotPage-container">
            <div className="forgot-container">

      <h2 className="mb-4 text-center">Forgot Password</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      {message && <p className="text-success text-center">{message}</p>}
      <Form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            className="DefaultInput no-focus"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Email</Form.Label>
        </div>
        <div className="text-center">
          <Button className="DefaultButton" variant="primary" type="submit">
            Send Reset Link
          </Button>
        </div>
      </Form>
    </div>
    </div>
  );
};

export default ForgotPassword;
