import bookingService from "../../../application/businesslogics/bookingService";


export const getUserBookings = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    console.log(userId,"user......Id")
    const bookings = await bookingService.getUserBookings(userId);
    console.log(bookings,"bokkkkkkkkkki")
    res.status(200).json({ bookings:bookings });
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve bookings", error: error });
  }
};
