import { Request, Response } from "express";
import { getReviewDetails } from "../../../application/businesslogics/user/getReviewDetails";

export const getReview = async (req: any, res: any) => {
  try {
    const userId = req.user.id; 
    const { bookingId, providerId } = req.query;

    if (!bookingId || !providerId) {
      return res .status(400).json({ message: "bookingId and providerId are required." });
    }

    const review = await getReviewDetails(
      userId as string,
      bookingId as string,
      providerId as string
    );

    if (!review) {
      return res.status(404).json({ message: "No review found for this booking." });
    }

    return res.status(200).json({ review });
  } catch (error) {
    console.error("Error fetching review:", error);
    return res.status(500).json({
      message: "Failed to fetch review. Please try again later.",
    });
  }
};
