import { getUserBookingsBySelectedTime } from "../../../application/businesslogics/bookingService";


export const getUserBookingsbyTime = async (req:any, res:any) => {
    try {
      const { providerId, selectedTime, selectedDate } = req.query;
  
      if (!providerId) {
        return res.status(400).json({ message: "providerId is required." });
      }
  
      const bookings = await getUserBookingsBySelectedTime(providerId, selectedTime, selectedDate);
  
      res.status(200).json({ bookings });
    } catch (error) {
      console.error("Error in getUserBookingsbyTime:", error);
      res.status(500).json({ message: "Failed to retrieve bookings", error: error });
    }
  };
  