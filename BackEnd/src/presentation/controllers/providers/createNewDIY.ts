import { Request, Response } from "express";
import { createDIYService, searchDIYS } from '../../../application/businesslogics/provider';
import { IDIY } from "../../../infrastructure/dbModels/diy";

export const createNewDIY = async (req: any, res: Response) => {
  try {
    const diyData: Partial<IDIY> = {
      providerId: req.user.id,
      ditTitle: req.body.ditTitle,
      purpose: req.body.purpose,
      materialsRequired: JSON.parse(req.body.materialsRequired || '[]'),
      steps: JSON.parse(req.body.steps || '[]'),
      category: req.body.category,
      safetyTips: JSON.parse(req.body.safetyTips || '[]'),
      additionalNotes: req.body.additionalNotes,
      photos: req.files?.photos
        ? (req.files.photos as Express.Multer.File[]).map((file) => file.path)
        : [],
        vedios: req.files?.videos
        ? (req.files.videos as Express.Multer.File[]).map((file) => file.path)
        : [],
    };
    


   
    
      
    console.log(diyData,"..............diyData")
    const result = await createDIYService(diyData);
    res.status(201).json({ message: "DIY Tip created successfully!", result });
  } catch (error) {
    console.error("Error creating DIY Tip:", error);
    res.status(500).json({ error: "Failed to create DIY Tip" });
  }
};
export const findAllDiysByProvider = async (req: Request, res: Response) => {
    try {
      const { providerId } = req.query;
  
      if (!providerId || typeof providerId !== "string") {
        res.status(400).json({ error: "Provider ID is required and must be a string" });
        return;
      }
  
      const result = await searchDIYS(providerId as string);
  
      res.status(200).json({ message: "DIYs fetched successfully", diy: result });
    } catch (error) {
      console.error("Error fetching DIYs:", error);
      res.status(500).json({ error: "Failed to fetch DIYs" });
    }
  };
  