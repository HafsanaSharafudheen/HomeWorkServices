import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from '../Entities/user'
export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ "email" : email});
  console.log("user", user);
  if (!user) throw new Error("User not found");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new Error("Invalid credentials");
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }
  
  const token = jwt.sign(
    { id: user._id, email: user.email },
    secret,
    { expiresIn: "1h" }
  );
  
console.log(token,"token")
  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  };
};
