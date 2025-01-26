import mongoose, { Schema, Document } from "mongoose";

export interface IProvider extends Document {
  fullName: string;
  email: string;
  phone?: string;
  isBlocked: boolean;
  address?: {
    city: string;
    district: string;
    pin: string;
  };
  whatsappNumber?: string;
  password: string;
  contactNumber?: string;
  serviceCategory?: string;
  yearsOfExperience?: number;
  workingHours?: {start: string, end:string}
  certifications?: string;
  isAdmin: boolean;
  languages?: string[];
  education?: {
    institute: string;
    year: number;
  };
  serviceCharge?:number ; 
  confirmPassword?: string;
  isAvailable:Boolean;
  createdAt: Date;
  updatedAt: Date;
  updatedBy?: string;
  profilePicture?:string
  accountNumber:string;
  IFSCCode:string

}
const providerSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: {
    city: { type: String, required: true },
    district: { type: String, required: true },
    pin: { type: String, required: true },
  },
  phone: { type: String },
  whatsappNumber: { type: String ,required:true,unique:true},
  password: { type: String, required: true },
  contactNumber: { type: String },
  serviceCategory: { type: String },
  yearsOfExperience: { type: Number },
  workingHours: {
    start:{type:String},
    end:{type:String} 
  },
  isAvailable:{type: Boolean, default: false},

  certifications: { type: String },
  languages: { type: [String] },
  education: {
    institute: { type: String },
    year: { type: Number },
  },
  accountNumber: { type: String, required: true }, 
  IFSCCode: { type: String, required: true }, 
  profilePicture:{type:String},
  isBlocked: { type: Boolean, default: false },

  confirmPassword: { type: String },
  isAdmin: { type: Boolean, default: false },
  updatedBy: { type: String },
 serviceCharge: { type: Number },
}, {
  timestamps: true, 
});

export default mongoose.model<IProvider>("Provider", providerSchema);
