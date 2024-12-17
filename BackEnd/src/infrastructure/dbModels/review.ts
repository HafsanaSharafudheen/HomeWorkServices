import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  userId:string;
    providerId:string;
    bookingId:string;
  ratings: number;
  message: string;
  workImage?: string | null;
  workVideo?: string; 
  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    userId: {
      type:String,
      ref: "User", 
      required: true,
    },
    bookingId: {
        type:String,
        ref: "Booking", 
        required: true,
      },
    providerId: {
      type: String,
      ref: "Provider", 
      required: true,
    },
    ratings: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: true,
    },
    workImage: {
      type: String,
    },
    workVideo: {
      type: String, 
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<IReview>("Review", ReviewSchema);
