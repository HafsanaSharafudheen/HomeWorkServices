import { Request, Response } from "express";
import { saveReviewDetails } from "../../../application/businesslogics/user/saveReviewFromUser";

export const SaveReview = async (req: any, res: any) => {
  try {
    const userId = req.user.id;

    const { bookingId, providerId, ratings, message } = req.body;

    const workImage = req.file ? req.file.path : null;

    if (!bookingId || !providerId || !ratings || !message) {
      return res
        .status(400)
        .json({ message: "All fields are required to submit a review." });
    }

    const reviewData = {
      bookingId,
      providerId,
      userId,
      workImage,
      ratings: parseInt(ratings, 10),
      message,
      createdAt: new Date(),
    };

    const savedReview = await saveReviewDetails(reviewData);

    return res.status(201).json({
      message: "Review submitted successfully!",
      review: savedReview,
    });
  } catch (error) {
    console.error("Error saving review:", error);
    return res.status(500).json({
      message: "Failed to save the review. Please try again later.",
    });
  }
};
