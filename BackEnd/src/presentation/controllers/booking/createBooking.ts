import bookingService from "../../../application/businesslogics/bookingService";

export const createBooking = async (req: any, res: any): Promise<void> => {
 
  const userId = req.user.id;
  const { providerId, selectedDate, selectedTimeSlot } = req.body;
  if (!providerId || !selectedDate || !selectedTimeSlot) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  try {
    const booking = await bookingService.execute({ userId, providerId, selectedDate, selectedTimeSlot });
    res.status(201).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
