import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: { city: string; pin: number; district: string };
  password: string;
  whatsappNumber: number;
  isAdmin: boolean;
  isBlocked: boolean;
  resetPasswordToken?: string;
  resetPasswordExpires?: number;
  profilePicture:string;

}

const userSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: {
    city: { type: String },
    pin: { type: Number },
    district: { type: String },
  },
  password: { type: String, required: true },
  whatsappNumber: { type: Number, required: true,unique:true },
  isAdmin: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
  resetPasswordToken: { type: String }, 
  resetPasswordExpires: { type: Number }, 
  profilePicture:{type: String},
});

// Export the User model
export default mongoose.model<IUser>("User", userSchema);
