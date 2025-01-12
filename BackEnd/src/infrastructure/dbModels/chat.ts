import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  sender: string;
  receiver: string;
  message: string;
  read: boolean;
  readAt?: Date; 
  createdAt?: Date;
  updatedAt?: Date;
}

const ChatSchema: Schema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false, 
    },
    readAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
