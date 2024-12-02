import User from "../../infrastructure/dbModels/user";

const saveUser = async (userData: any): Promise<any> => {
  const user = new User(userData);
  return user.save();
};

export default { saveUser };
