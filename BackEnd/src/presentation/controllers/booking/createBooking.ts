import bookingService from "../../../application/businesslogics/bookingService";

export const createBooking = async (req: any, res: any): Promise<void> => {
  const userId = req.user.id;
  let { providerId, selectedDate, selectedTime, amount } = req.body;

  if (!providerId || !selectedDate || !selectedTime || !amount) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    selectedDate = new Date(selectedDate);
    selectedDate.setUTCHours(0, 0, 0, 0);

    const booking = await bookingService.execute({
      userId,
      providerId,
      selectedDate,
      selectedTime,
      payment: {
        amount: amount,
        method: "pending",
        status: "pending", 
      },
    });

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: "Failed to create booking." });
  }
};
