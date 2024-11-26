import React from "react";
import { Button, Form } from "react-bootstrap";
import "./Login.css";
import image from "../../assets/blackTools.jpeg"; 

function Login() {
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
        <Form>
          <div className="form-floating mb-3">
            <Form.Control
              type="text"
              id="floatingUsername"
              placeholder="Username"
              className="DefaultInput no-focus"
            />
            <Form.Label htmlFor="floatingUsername">Username</Form.Label>
          </div>
          <div className="form-floating mb-3">
            <Form.Control
              type="password"
              id="floatingPassword"
              placeholder="Password"
              className="DefaultInput no-focus"
            />
            <Form.Label htmlFor="floatingPassword">Password</Form.Label>
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
