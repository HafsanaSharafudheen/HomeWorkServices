import login from './Login';

describe("API Testing for /login", () => {
  it("should return 200 and user data on successful login", async () => {
    const mockUser = {
      email: "test@example.com",
      password: "password123",
    };

    const response = await login()
      

    expect(response.status).toBe(200); // Expect a success status
    expect(response.body).toHaveProperty("user"); // Ensure user data is returned
    expect(response.body.user).toMatchObject({
      email: "test@example.com",
      isProvider: expect.any(Boolean),
      isAdmin: expect.any(Boolean),
    });
  });

  it("should return 400 if email or password is missing", async () => {
    const response = await (login)
      .post("/login")
      .send({ email: "" });

    expect(response.status).toBe(400); // Expect a bad request status
    expect(response.body).toHaveProperty("message", "Both fields are required.");
  });

  it("should return 401 if credentials are invalid", async () => {
    const response = await (login)
      .post("/login")
      .send({
        email: "invalid@example.com",
        password: "wrongpassword",
      });

    expect(response.status).toBe(401); // Expect an unauthorized status
    expect(response.body).toHaveProperty("message", "Invalid credentials.");
  });

  it("should return 500 for server errors", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // Suppress console.error in tests

    const response = await (login)
      .post("/login")
      .send({
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(500); // Expect an internal server error
    expect(response.body).toHaveProperty(
      "message",
      "Something went wrong. Please try again later."
    );
  });
});
