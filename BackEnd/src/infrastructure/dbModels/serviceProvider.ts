import mongoose, { Schema, Document } from "mongoose";

export interface IProvider extends Document {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
  contactNumber?: string;
  serviceCategory?: string;
  yearsOfExperience?: number;
  workingHours?: string;
  certifications?: string;
  isAdmin: boolean;
  languages?: string[];
  education?: {
    institute: string;
    year: number;
  };
  serviceCharges?: { type: string; amount: number | string }[]; 
  confirmPassword?: string;
  isAvailable:Boolean
}
const providerSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  password: { type: String, required: true },
  contactNumber: { type: String },
  serviceCategory: { type: String },
  yearsOfExperience: { type: Number },
  workingHours: { type: String },
  isAvailable:{type: Boolean, default: false},

  certifications: { type: String },
  languages: { type: [String] },
  education: {
    institute: { type: String },
    year: { type: Number },
  },
  confirmPassword: { type: String },
  isAdmin: { type: Boolean, default: false },
  serviceCharges: [
    {
      type: { type: String, required: true }, 
      amount: { type: Number, required: true }, 
    },
  ],
});

export default mongoose.model<IProvider>("Provider", providerSchema);
