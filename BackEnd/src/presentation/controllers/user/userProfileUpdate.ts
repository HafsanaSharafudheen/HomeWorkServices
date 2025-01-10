import path from "path";
import { updateUserProfile } from "../../../application/businesslogics/user/updateUserProfile";
import User from '../../../infrastructure/dbModels/user';
import { updateProfilePicture } from '../../../application/businesslogics/profilePicture';

 export const UserProfileUpdate = async (req: any, res: any): Promise<void> => {
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

export const uploadProfilePictureOfUser = async (req: any, res: any): Promise<void> => {
  try {
    const entityId = req.user?.id;
    const entityType  = req.body.entityType;
    if (!req.file) {
      res.status(400).send({ error: 'No file uploaded' });
      return;
    }
    console.log(req.file, 'requestfile.....1');

    const filePath = `/uploads/${req.file.filename}`;
    console.log(filePath, 'filePaaaath2');

    const updatedEntity = await updateProfilePicture(entityType, entityId, filePath);
    if (!updatedEntity) {
      res.status(404).send({ error: `${entityType} not found` });
      return;
    }
    res.status(200).send({
      message: 'Profile picture uploaded successfully',
      filePath,
    });
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).send({ error: 'An error occurred while uploading the profile picture' });
  }
};


export default {UserProfileUpdate,uploadProfilePictureOfUser};
