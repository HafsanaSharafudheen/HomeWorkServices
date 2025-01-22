import mongoose from "mongoose";
import { updateProviderBlockStatus } from "../../../application/businesslogics/admin";
import review from "../../../infrastructure/dbModels/review";

const blockProvider = async (req: any, res: any) => {
    console.log(req.params.id,"-paramaID")
  try {
    const provider = await updateProviderBlockStatus(req.params.id, true);
    res.status(200).json({ message: "provider blocked successfully", provider });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const unblockProvider = async (req: any, res: any) => {
  try {
    const provider = await updateProviderBlockStatus(req.params.id, false);
    res.status(200).json({ message: "provider unblocked successfully", provider });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const fetchAllReviews = async (req:any, res:any) => {
    try {
      const { providerId } = req.params; 
      const reviews = await review.aggregate([
        {
          $match: { providerId }, 
        },
        {
          $addFields: {
            userIdObject: { $toObjectId: "$userId" }, 
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userIdObject", 
            foreignField: "_id", 
            as: "userDetails",
          },
        },
        {
          $unwind: "$userDetails", 
        },
      ]);
  
      res.json({ reviews });
    } catch (error) {
      console.error("Error fetching reviews with user details:", error);
      res.status(500).send({ error: "Failed to fetch reviews" });
    }
  };
  

export default { blockProvider, unblockProvider,fetchAllReviews };
