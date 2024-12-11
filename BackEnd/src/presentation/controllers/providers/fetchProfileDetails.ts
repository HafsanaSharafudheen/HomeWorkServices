import { Request, Response } from "express";
import  Provide  from "../../../application/businesslogics/provider";

const fetchProfileDetails = async (req: any, res: any): Promise<void> => {
  try {

    const provider = await Provide.findProviderById(req.user.id);
console.log("provider from frtch porilr details",provider);

    return res.status(200).json({ message: "Details of provider found", profile: provider });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
};

export default fetchProfileDetails;
