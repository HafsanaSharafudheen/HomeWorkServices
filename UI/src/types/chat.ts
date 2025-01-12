import { Provider } from "./provider";
import { User } from "./user";

export interface ChatType {
    _id: string;
    sender:string;
    receiverDetails:User|Provider;
    senderDetails:User|Provider;
    fullName:string;
    reciever:string;
    message:string;
    createdAt: string;
    updatedAt: Date;
    read?: boolean;
    readAt?: Date;
    fromProvider:boolean;
  }
  