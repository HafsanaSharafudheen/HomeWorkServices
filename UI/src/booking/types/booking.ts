import { Provider } from "../../ServiceProvider/types/provider";
import { User } from "../../User/types/user";

export interface Booking {
    _id?: string;
    userId: string;
    providerId: string;
    selectedDate: Date;
    selectedTime: string;
    createdAt?: Date;
    status: string;
    payment?: {
      method: string;
      amount: number;
      status: string;
      releasedDate?:Date
      time?: Date;
    };
    providerDetails?: Provider[]
    userDetails?:User[];
    workingUpdates: {
      title: string;
      description: string;
      photos: string[];
      videos: string[];
      time: Date;
    }[];
    }
  