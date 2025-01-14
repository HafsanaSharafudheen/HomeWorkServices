import { IBooking } from "../../infrastructure/dbModels/booking";
import bookingRepository from "../repositories/bookingRepository";
import Bookings from '../../infrastructure/dbModels/booking'
const execute = async (bookingData: Partial<IBooking>): Promise<IBooking> => {
  const { userId, providerId, selectedDate, selectedTime, payment } = bookingData;

  if (!payment || typeof payment.amount !== "number" || payment.amount <= 0) {
    throw new Error("Invalid payment amount.");
  }

  const newBooking = await bookingRepository.saveBooking({
    userId,
    providerId,
    selectedDate,
    selectedTime,
    createdAt: new Date(),
    payment: {
      method: payment.method || "pending",
      amount: payment.amount,
      status: payment.status || "pending",
    },
  });

  return newBooking;
};

export const getUserBookings = async (userId: string) => {
  if (!userId) throw new Error("User ID is required");
  return await bookingRepository.getBookingsByUserId(userId);
};

export const getUserBookingsBySelectedTime = async (
  providerId: string,
  selectedTime?: string,
  selectedDate?: string
) => {
  if (!providerId) {
    throw new Error("providerId is required.");
  }

  // Construct query
  const query: {
    providerId: string;
    selectedTimeSlot?: string;
    selectedDate?: { $gte: Date; $lte: Date };
  } = { providerId };
  // Add time slot filter if provided
  if (selectedTime) {
    query.selectedTimeSlot = selectedTime;
  }

  // Add date range filter if selectedDate is provided
  if (selectedDate) {
    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    query.selectedDate = { $gte: startOfDay, $lte: endOfDay };
  }
  console.log(query,"qqqqqqqqqqqqqqqq")
  console.log("Query Date Range (Backend):", query.selectedDate);

  try {
    // Query the database
    const bookings = await Bookings.find(query);
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw new Error("Failed to fetch bookings.");
  }
};



export default { execute ,getUserBookings,getUserBookingsBySelectedTime};
