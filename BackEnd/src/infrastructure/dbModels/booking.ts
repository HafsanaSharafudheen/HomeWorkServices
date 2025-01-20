import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  providerId: string;
  selectedDate: Date;
  selectedTime: string;
  createdAt: Date;
  status: "pending" | "rejected" | "completed";
    payment: {
    method: string;
    amount: number;
    releasedDate?: Date;
    status: string;
  };
  workingUpdates: {
    title: string;
    description: string;
    photos: string[];
    videos: string[];
    time: Date;
  }[];
}

const bookingSchema: Schema = new Schema({
  userId: { type: String, required: true },
  providerId: { type: String, required: true },
  selectedDate: { type: Date, required: true },
  selectedTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["pending", "rejected","accepted", "completed"],
    default: "pending",},
  payment: {
    method: { type: String, required: true },
    amount: { type: Number, required: true },
    releasedDate: { type: Date },
    status: { type: String, required: true },
  },
  workingUpdates: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      photos: { type: [String], default: [] },
      videos: { type: [String], default: [] },
      time: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model<IBooking>("Booking", bookingSchema);
