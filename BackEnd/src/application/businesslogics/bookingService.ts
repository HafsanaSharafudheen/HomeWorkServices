import { IBooking } from "../../infrastructure/dbModels/booking";
import bookingRepository from "../repositories/bookingRepository";

const execute = async (bookingData: {
  userId: string;
  providerId: string;
  selectedDate: Date;
  selectedTimeSlot: string;
}): Promise<IBooking> => {
  const { userId, providerId, selectedDate, selectedTimeSlot } = bookingData;

  // Create the new booking
  const newBooking = await bookingRepository.saveBooking({
    userId,
    providerId,
    selectedDate,
    selectedTime:selectedTimeSlot,
    createdAt: new Date(),
    payment: {
      method: "pending",
      amount: 0,
      status: "pending",
    },
  });

  return newBooking;
};

export default { execute };
