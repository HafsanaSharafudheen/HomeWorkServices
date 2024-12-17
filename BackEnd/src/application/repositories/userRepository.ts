import mongoose from "mongoose";
import User from "../../infrastructure/dbModels/user";
import { IUser } from "../../infrastructure/dbModels/user";
import { IReview } from "../../infrastructure/dbModels/review";
import Review from "../../infrastructure/dbModels/review";


const saveUser = async (userData: Partial<IUser>): Promise<IUser> => {
  const user = new User(userData); 
  return user.save(); 
};

 export const getUserById = async (userId: string) => {
  const objectId = new mongoose.Types.ObjectId(userId);
  try {
    return await User.findOne({ _id: objectId })
  } catch (error) {
    throw new Error(`Error fetching user from database: ${error}`);
  }
};
export const saveData = async (reviewData: Partial<IReview>) => {
  const review = new Review(reviewData); 
  return await review.save(); 
};

export const findReview = async (userId: string,bookingId: string,providerId: string):
 Promise<IReview | null> => {
  return await Review.findOne({ userId, bookingId, providerId });
}
export default { saveUser,getUserById };
