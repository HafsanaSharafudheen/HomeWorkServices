import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id:string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  password: string;
  isAdmin: Boolean;

}

const userSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  address: { type: String },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },

});

export default mongoose.model<IUser>("User", userSchema);
