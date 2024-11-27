import userRepository from "../adapters/repositories/userRepository";
import serviceProvider from "../entities/serviceProvider";

const execute = async (userData: {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}): Promise<any> => {
  const { fullName, email, phone, address, password } = userData;

  if (!fullName || !email || !password) {
    throw new Error("Missing required fields");
  }

  const hashedPassword = await serviceProvider.hashPassword(password);

  return userRepository.saveUser({
    fullName,
    email,
    phone,
    address,
    password: hashedPassword,
  });
};

export default { execute };
