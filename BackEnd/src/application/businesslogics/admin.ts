import bcrypt from "bcryptjs";
import Provider from '../../infrastructure/dbModels/serviceProvider';
import User from '../../infrastructure/dbModels/user';

const findAllProviders = async (): Promise<any> => {
    const providers = await Provider.find(); 
    if (!providers || providers.length === 0) {
      console.warn("No providers found in the database.");
    }
    return providers;
};

const findAllUsers = async (): Promise<any> => {
    const users=await User.find(); 
if (!users || users.length === 0) {
  console.warn("No users found in the database.");
}
return users
}
export default { findAllProviders,findAllUsers  };
