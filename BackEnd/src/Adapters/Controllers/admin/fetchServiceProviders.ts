import { Request, Response } from "express";
import Provider from '../../../Entities/serviceProvider';


const fetchProviders = async (req: Request, res: Response): Promise<void> => {
  try {
    const providers = await Provider.find(); 
    if (!providers || providers.length === 0) {
      console.warn("No providers found in the database.");
    }
    console.log(providers,"providers array???")
    res.status(200).json({providers:providers});
  } catch (e) {
    console.error("Error fetching providers:", e);
    res.status(500).json({ message: "Failed to fetch providers." });
  }
};

export default fetchProviders;
