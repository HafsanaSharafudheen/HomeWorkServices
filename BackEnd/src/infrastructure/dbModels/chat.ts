import mongoose, { Schema, Document } from "mongoose";

export interface IChat extends Document {
  sender: string;
  receiver: string;
  message: string;
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IChat>("Chat", ChatSchema);
