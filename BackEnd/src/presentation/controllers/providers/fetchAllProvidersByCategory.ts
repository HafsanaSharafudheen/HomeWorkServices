import { Request, Response } from "express";
import provider from "../../../application/businesslogics/provider";

const fetchAllProvidersByCategory = async (req: any, res: any): Promise<void> => {
  try {
    const { serviceCategory } = req.query;
    console.log(req.query,"request query from the providers details")

    if (!serviceCategory) {
      return res.status(400).json({ message: "Service category is required" });
    }
    const providers = await provider.findAllProvidersByCategory(serviceCategory );

    
    
    return res.status(200).json({ message: "Details of provider found", providers: providers });

  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
};

export default fetchAllProvidersByCategory;
