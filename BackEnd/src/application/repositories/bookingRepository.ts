import Booking, { IBooking } from "../../infrastructure/dbModels/booking";
import mongoose from "mongoose";

const saveBooking = async (bookingData: Partial<IBooking>): Promise<IBooking> => {
  const booking = new Booking(bookingData);
  return await booking.save();
};


const getBookingsByUserId = async (userId: string) => {
  try {
    const bookings = await Booking.aggregate([
      {
        $match: { userId: userId }
      },
      {
        // Convert providerId from string to ObjectId
        $addFields: {
          providerId: { $toObjectId: "$providerId" }
        }
      },
      {
        $lookup: {
          from: "providers",        
          localField: "providerId",  
          foreignField: "_id",       
          as: "providerDetails"  
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    return bookings;
  } catch (error) {
    throw new Error(`Error fetching bookings with provider details: ${error}`);
  }
};


export default { getBookingsByUserId,saveBooking };
