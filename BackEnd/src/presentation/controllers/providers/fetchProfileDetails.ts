import { Request, Response } from "express";
import { findProviderById } from "../../../application/businesslogics/provider";

const fetchProfileDetails = async (req: any, res: any): Promise<void> => {
  try {

    const provider = await findProviderById(req.user.id);


    return res.status(200).json({ message: "Details of provider found", profile: provider });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
};

export default fetchProfileDetails;
