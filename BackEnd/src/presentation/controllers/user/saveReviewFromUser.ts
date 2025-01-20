import { Request, Response } from "express";
import { saveReviewDetails } from "../../../application/businesslogics/user/saveReviewFromUser";

export const SaveReview = async (req:any, res:any) => {
  try {
    const { bookingId, providerId, ratings, message } = req.body;
    const workImage = req.files["workImage"]?.map((file:any) => file.path) || [];
    const workVideo = req.files["workVideo"]?.map((file:any) => file.path) || [];

    if (!bookingId || !providerId || !ratings || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const reviewData = {
      bookingId,
      providerId,
      userId: req.user.id,
      ratings: parseInt(ratings, 10),
      message,
      workImage,
      workVideo,
      createdAt: new Date(),
    };

    const savedReview = await saveReviewDetails(reviewData);

    return res.status(201).json({
      message: "Review submitted successfully!",
      review: savedReview,
    });
  } catch (error) {
    console.error("Error saving review:", error);
    return res
      .status(500)
      .json({ message: "Failed to save the review. Try again later." });
  }
};
