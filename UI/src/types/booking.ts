import { Provider } from "./provider";
import { User } from "./user";

export interface Booking {
    _id?: string;
    userId: string;
    providerId: string;
    selectedDate: Date;
    selectedTime: string;
    createdAt?: Date;
    status: string;
    payment: {
      method: string;
      amount: number;
      status: string;
    };
    providerDetails?: Provider[]
    userDetails?:User[];
  }
  