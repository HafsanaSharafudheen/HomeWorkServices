import { Request, Response } from "express";
import { createDIYService } from '../../../application/businesslogics/provider';

export const createNewDIY = async (req: any, res: Response) => {
  try {
    const diyData = req.body;
    const providerId = req.user.id;
    const result = await createDIYService(diyData,providerId);
    res.status(201).json({ message: "DIY Tip created successfully!", result });
  } catch (error) {
    console.error("Error creating DIY Tip:", error);
    res.status(500).json({ error: "Failed to create DIY Tip" });
  }
};
