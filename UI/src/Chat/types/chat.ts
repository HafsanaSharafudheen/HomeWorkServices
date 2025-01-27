import { Provider } from "../../ServiceProvider/types/provider";
import { User } from "../../User/types/user";

export interface ChatType {
    _id: string;
    sender:string;
    receiverDetails:User|Provider;
    senderDetails:User|Provider;
    fullName:string;
    receiver:string;
    message:string;
    userName?:string;
    createdAt: string;
    updatedAt: Date;
    read?: boolean;
    readAt?: Date;
    fromProvider:boolean;
  }
  