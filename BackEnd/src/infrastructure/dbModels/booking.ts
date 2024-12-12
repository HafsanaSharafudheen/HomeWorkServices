import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: string;
  providerId: string;
  selectedDate: Date;
  selectedTime: string;
  createdAt: Date;
  payment: {
    method: string;
    amount: number;
    releasedDate?: Date;
    status: string;
  };
}

const bookingSchema: Schema = new Schema({
  userId: { type: String, required: true },
  providerId: { type: String, required: true },
  selectedDate: { type: Date, required: true },
  selectedTime: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  payment: {
    method: { type: String, required: true },
    amount: { type: Number, required: true },
    releasedDate: { type: Date },
    status: { type: String, required: true },
  },
});

export default mongoose.model<IBooking>("Booking", bookingSchema);
