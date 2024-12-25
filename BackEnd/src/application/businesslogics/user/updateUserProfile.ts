
import user from "../../../infrastructure/dbModels/user";

export const updateUserProfile = async (userId: string, updateData: any) => {
  if (!userId) {
    throw new Error("Profile ID is required");
  }

  const updatedProfile = await user.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  );

  if (!updatedProfile) {
    throw new Error("User not found or update failed");
  }

  return updatedProfile;
};
