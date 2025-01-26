import bcrypt from "bcryptjs";
import { UserEntity } from "../../domain/userEntity";
import providerRepository from "../repositories/providerRepository";
import user from "../../infrastructure/dbModels/user";

const execute = async (userData: UserEntity): Promise<any> => {
  

  // Validate required fields
  if (!userData.fullName || !userData.email || !userData.password || !userData.whatsappNumber) {
    throw new Error("Missing required fields");
  }
  const existingUser = await providerRepository.findProviderByWhatsappNumber(userData.whatsappNumber);
  if (existingUser) {
    throw new Error("WhatsApp number already exists. Please use a different WhatsApp number.");
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
       accountNumber: userData.accountNumber,
       IFSCCode: userData.IFSCCode,
    certifications: userData.certifications,
    languages: userData.languages,
    education: userData.education,
    serviceCharge: userData.serviceCharge,
whatsappNumber: userData.whatsappNumber,

  });
};

export default { execute };
