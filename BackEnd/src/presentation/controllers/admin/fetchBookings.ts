import { Request, Response } from "express";
import Admin from '../../../application/businesslogics/admin';


const fetchBookings = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookings=await Admin.findAllBookings()
    res.status(200).json({bookings:bookings});
  } catch (e) {
    console.error("Error fetching bookings:", e);
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
};

export default fetchBookings;
