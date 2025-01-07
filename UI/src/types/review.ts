import { User } from "./user";

export interface Review  {
  _id?: string;
    userId:string;
      providerId:string;
    ratings: number;
    message: string;
    workImage?: string; 
    workVideo?: string; 
    createdAt?: Date;
    updatedAt?: Date;
    userDetails:User
  }