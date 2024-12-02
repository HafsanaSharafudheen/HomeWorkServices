import { Request, Response } from "express";
import  Provide  from "../../../application/businesslogics/provider";

const fetchProfileDetails = async (req: any, res: any): Promise<void> => {
  try {

    const providers = await Provide.findAllProvidersByCategory(req.query.serviceCategory );


    return res.status(200).json({ message: "Details of provider found", providers: providers });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
};

export default fetchProfileDetails;
