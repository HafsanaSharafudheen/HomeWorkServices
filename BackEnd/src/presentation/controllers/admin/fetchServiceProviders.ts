import { Request, Response } from "express";
import Admin from '../../../application/businesslogics/admin';


const fetchProviders = async (req: Request, res: Response): Promise<void> => {
  try {
    var providers = await Admin.findAllProviders();
    res.status(200).json({providers:providers});
  } catch (e) {
    console.error("Error fetching providers:", e);
    res.status(500).json({ message: "Failed to fetch providers." });
  }
};

export default fetchProviders;
