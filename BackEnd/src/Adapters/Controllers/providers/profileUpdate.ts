import { Request, Response } from "express";
import Provider from "../../../Entities/serviceProvider"; // Assuming this is the Mongoose model for Provider

const ServiceProfileUpdate = async (req: any, res: any): Promise<void> => {
  try {
    // Extract user ID from the authenticated request
    const userId = req.user.id;

    // Define the fields that can be updated
    const updatableFields = [
      "name",
      "email",
      "phone",
      "address",
      "languages",
      "serviceCategory",
      "yearsOfExperience",
      "education",
      'workingHours',
      "availability",
      "certifications",
      "basicPayment",
      "emergencyPayment",
      "onsiteCharge",
      "advancedCharge",
    ];

    const updateData:any= {};

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No valid fields to update" });
    }
    const result = await Provider.updateOne(
      { _id: userId },
      { $set: updateData }
    );

    if (!result) {
      return res.status(404).json({ message: "No service provider found or no changes made" });
    }

    return res.status(200).json({
      message: "Profile updated successfully",
      updatedFields: updateData,
    });
  } catch (error) {
    console.error("Error updating profile:", error);

    res.status(500).json({ message: "Error updating profile" });
  }
};

export default ServiceProfileUpdate;
