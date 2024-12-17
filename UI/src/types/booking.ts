import { Provider } from "./provider";

export interface Booking {
    _id?: string;
    userId: string;
    providerId: string;
    selectedDate: Date;
    selectedTime: string;
    createdAt?: Date;
    payment: {
      method: string;
      amount: number;
      status: string;
    };
    providerDetails?: Provider[];
  }
  