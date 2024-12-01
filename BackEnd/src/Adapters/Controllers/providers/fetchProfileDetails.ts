import { Request, Response } from "express";
import Provider from "../../../Entities/serviceProvider";

const fetchProfileDetails = async (req: any, res: any): Promise<void> => {
  try {
    const provider = await Provider.findOne({ _id: req.user.id });

    if (!provider) {
      return res.status(404).json({ message: "No service provider found" });
    }

    return res.status(200).json({ message: "Details of provider found", profile: provider });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
};

export default fetchProfileDetails;
