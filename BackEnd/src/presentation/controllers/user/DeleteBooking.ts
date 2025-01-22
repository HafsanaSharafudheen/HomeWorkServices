import mongoose from "mongoose";
import booking from "../../../infrastructure/dbModels/booking";

export const deleteFromUser = async (req:any, res:any) => {
  try {
    const  bookingId  = req.body.bookingId; 
    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID is required." });
    }

    const objectId = new mongoose.Types.ObjectId(bookingId);

    const result = await booking.findOneAndUpdate(
      { _id: objectId }, 
      { $set: { status: "cancelled" } }, 
      { new: true } 
    );
       
    console.log(objectId,result,"ppppffffffffffffffffiiiii")

    if (!result) {
      return res.status(404).json({ message: "Booking not found." });
    }

    return res.status(200).json({ message: "Booking deleted successfully." });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({ message: "Failed to delete booking." });
  }
};
