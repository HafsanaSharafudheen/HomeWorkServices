import bcrypt from "bcryptjs";
import userRepository from "../../application/repositories/userRepository";
import { IUser } from "../../infrastructure/dbModels/user";

const execute = async (userData: {
  fullName: string;
  email: string;
  phone?: string;
  address: { city: string; pin: number; district: string };
  password: string;
  whatsappNumber: number;
}): Promise<IUser> => {
  const { fullName, email, phone, address, password, whatsappNumber } = userData;

  // Validate required fields
  if (!fullName || !email || !password || !whatsappNumber || !address) {
    throw new Error(
      "Missing required fields: fullName, email, password, whatsappNumber, and address are mandatory"
    );
  }

  // Validate address fields
  if (!address.city || !address.district || !address.pin) {
    throw new Error("Address must include city, district, and pin.");
  }

  // Hash the user's password
  const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };
  const hashedPassword = await hashPassword(password);

  // Save the user using the repository
  const savedUser = await userRepository.saveUser({
    fullName,
    email,
    phone,
    address,
    password: hashedPassword,
    whatsappNumber,
    isAdmin: false, 
  });

  return savedUser;
};

export default { execute };
