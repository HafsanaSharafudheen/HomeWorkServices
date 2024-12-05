import bcrypt from "bcryptjs";
import { UserEntity } from "../../domain/userEntity";
import providerRepository from "../repositories/providerRepository";
import user from "../../infrastructure/dbModels/user";

const execute = async (userData: UserEntity): Promise<any> => {
  

  // Validate required fields
  if (!userData.fullName || !userData.email || !userData.password) {
    throw new Error("Missing required fields");
  }

  // Hash the password
  const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };
  const hashedPassword = await hashPassword(userData.password);

  // Save user data using the repository
  return providerRepository.saveUser({
    fullName: userData.fullName,
    email: userData.email,
    phone: userData.phone,
    address: userData.address, 
        password: hashedPassword,
    contactNumber: userData.contactNumber,
    serviceCategory: userData.serviceCategory,
    yearsOfExperience: userData.yearsOfExperience,
    workingHours: userData.workingHours,
       
    certifications: userData.certifications,
    languages: userData.languages,
    education: userData.education,
    serviceCharge: userData.serviceCharge,
whatsappNumber: userData.whatsappNumber,

  });
};

export default { execute };
