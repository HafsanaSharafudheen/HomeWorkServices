import { Request, Response } from "express";
import Provider from "../../../infrastructure/dbModels/serviceProvider"; // Mongoose Model for Provider

const ServiceProfileUpdate = async (req: any, res: any): Promise<void> => {
  try {
    const profileId=req.user.id
    

    if (!profileId) {
      return res.status(400).json({ message: "Profile ID is required" });
    }

    const updatedProfile = await Provider.findByIdAndUpdate(
      profileId,
      { $set: req.body },
      { new: true, } 
    );

    // Respond with the updated profile
    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile, 
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error updating profile" });
  }
};

export default ServiceProfileUpdate;
