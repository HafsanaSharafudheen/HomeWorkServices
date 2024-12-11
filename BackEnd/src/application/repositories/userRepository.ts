import User from "../../infrastructure/dbModels/user";
import { IUser } from "../../infrastructure/dbModels/user";

const saveUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData); 
  return user.save(); 
};

export default { saveUser };
