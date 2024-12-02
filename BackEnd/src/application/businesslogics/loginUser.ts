import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../infrastructure/dbModels/user";
import Provider from "../../infrastructure/dbModels/serviceProvider";

export const loginUser = async (email: string, password: string) => {
  // Attempt to find the user in the User collection
  let user = await User.findOne({ email });
  let isProvider = false;

  // If not found, check the Provider collection
  if (!user) {
    user = await Provider.findOne({ email });
    isProvider = true;
  }

  // Ensure the user exists
  if (!user) {
    throw new Error("User not found");
  }

  console.log("User found:", user);

  // Compare the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Ensure the JWT secret exists
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  const isAdmin = user.isAdmin || false;

  // Generate the token
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      isProvider,
      isAdmin,
    },
    secret,
    { expiresIn: "1h" }
  );

  console.log("Generated token:", token);

  // Return the token and user details
  return {
    token,
    user: {
      id: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      isProvider,
      isAdmin
    },
  };
};
