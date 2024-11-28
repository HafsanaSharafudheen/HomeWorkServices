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
  confirmPassword?: string;
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
  certifications: { type: String },
  languages: { type: [String] },
  education: {
    institute: { type: String },
    year: { type: Number },
  },
  confirmPassword: { type: String },
  isAdmin: { type: Boolean, default: false },

});

export default mongoose.model<IProvider>("Provider", providerSchema);
