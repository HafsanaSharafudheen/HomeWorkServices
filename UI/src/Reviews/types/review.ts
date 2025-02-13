import { User } from "../../User/types/user";

export interface Review  {
  _id?: string;
    userId:string;
      providerId:string;
    ratings: number;
    message: string;
    createdAt?: Date;
    updatedAt?: Date;
    userDetails:User[];
    workImage?:string[],
    workVideo? : string[];
    fullName?:string;
  }