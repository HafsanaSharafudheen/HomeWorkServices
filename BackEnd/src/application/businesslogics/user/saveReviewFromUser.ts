import { IReview } from "../../../infrastructure/dbModels/review";
import { saveData } from "../../repositories/userRepository";

export const saveReviewDetails = async (reviewData: Partial<IReview>) => {
    if (!reviewData) {
    throw new Error("Review details are required.");
  }

  const savedReview = await saveData(reviewData);

  if (!savedReview) {
    throw new Error("Failed to save the review.");
  }

  return savedReview;
};
