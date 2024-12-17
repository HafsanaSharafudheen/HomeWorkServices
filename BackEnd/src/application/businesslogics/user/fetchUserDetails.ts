import { getUserById } from "../../repositories/userRepository";

export const fetchUserDetails = async (userId: string) => {
  if (!userId) {
    throw new Error('User ID is required');
  }

  const user = await getUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
