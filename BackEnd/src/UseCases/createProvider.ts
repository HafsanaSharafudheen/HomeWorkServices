import bcrypt from "bcryptjs";
import providerRepository from "../Adapters/Repositories/providerRepository";

const execute = async (userData: {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
  contactNumber?: string;
  serviceCategory?: string;
  yearsOfExperience?: number;
  workingHours?: string;
  certifications?: string;
  languages?: string[];
  education?: {
    institute: string;
    year: number;
  };
}): Promise<any> => {
  const {
    fullName,
    email,
    phone,
    address,
    password,
    contactNumber,
    serviceCategory,
    yearsOfExperience,
    workingHours,
    certifications,
    languages,
    education,
  } = userData;

  // Validate required fields
  if (!fullName || !email || !password) {
    throw new Error("Missing required fields");
  }

  // Hash the password
  const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };
  const hashedPassword = await hashPassword(password);

  // Save user data using the repository
  return providerRepository.saveUser({
    fullName,
    email,
    phone,
    address,
    password: hashedPassword,
    contactNumber,
    serviceCategory,
    yearsOfExperience,
    workingHours,
    certifications,
    languages,
    education,
  });
};

export default { execute };
