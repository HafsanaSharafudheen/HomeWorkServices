import User from "../../Entities/user";

const saveUser = async (userData: any): Promise<any> => {
  const user = new User(userData);
  return user.save();
};

export default { saveUser };
