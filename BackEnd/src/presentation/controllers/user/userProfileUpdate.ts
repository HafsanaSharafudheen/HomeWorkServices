import { updateUserProfile } from "../../../application/businesslogics/user/updateUserProfile";


const UserProfileUpdate = async (req: any, res: any): Promise<void> => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const updatedProfile = await updateUserProfile(userId, req.body);

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: error|| "Error updating profile" });
  }
};

export default UserProfileUpdate;
