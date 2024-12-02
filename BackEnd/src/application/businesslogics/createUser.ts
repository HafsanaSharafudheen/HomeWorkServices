import bcrypt from "bcryptjs";
import userRepository from "../../application/repositories/userRepository";

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
  const hashPassword = async (password: string): Promise<string> => {
    return bcrypt.hash(password, 10);
  };
  const hashedPassword = await hashPassword(password);

  return userRepository.saveUser({
    fullName,
    email,
    phone,
    address,
    password: hashedPassword,
  });
};

export default { execute };
