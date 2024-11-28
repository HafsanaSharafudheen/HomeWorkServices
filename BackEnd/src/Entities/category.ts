import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  categoryName: string;
  categoryImage: string;
  createdAt?: Date;
  updatedAt?: Date; 
}

const CategorySchema: Schema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryImage: {
      type: String,
      required: true, 
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
