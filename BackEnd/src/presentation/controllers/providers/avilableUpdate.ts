import { Request, Response } from "express";
import  Provide  from "../../../application/businesslogics/provider";

const updateAvailability = async (req: any, res: any): Promise<void> => {
  try {
console.log(req.body)
    const provider = await Provide.updateProviderAvailable(req.user.id,req.body.isAvailable);


    return res.status(200).json({ message: "Details of provider found", profile: provider });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
};

export default updateAvailability;
