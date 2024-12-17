import { IReview } from "../../../infrastructure/dbModels/review";
import { findReview } from "../../repositories/userRepository";

export const getReviewDetails = async (
  userId: string,
  bookingId: string,
  providerId: string): Promise<IReview | null> => {
  if (!userId || !bookingId || !providerId) {
    throw new Error("All parameters (userId, bookingId, providerId) are required");
  }

  const review = await findReview(userId, bookingId, providerId);
  return review;
};
