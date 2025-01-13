import mongoose, { Schema, Document } from "mongoose";

export interface IDIY extends Document {
  ditTitle: string;
  purpose: string;
  materialsRequired: string[];
  steps: {
    title: string;
    description: string;
  }[];
  category: string;
  safetyTips: string[];
  additionalNotes: string;
  photos: string[];
  vedios: string[];
  providerId:string;
  createdAt?: Date;
  updatedAt?: Date;
}

const DIYSchema: Schema = new Schema({
    providerId:{type:String},
  ditTitle: { type: String, required: true },
  purpose: { type: String, required: true },
  materialsRequired: { type: [String], required: true },
  steps: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
  ],
  category: { type: String, required: true },
  safetyTips: { type: [String], required: true },
  additionalNotes: { type: String, required: false },
  photos: { type: [String], required: false },
  vedios: { type: [String], required: false },
},{timestamps:true});

export default mongoose.model<IDIY>("DIY", DIYSchema);
