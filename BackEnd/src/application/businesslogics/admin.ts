import bcrypt from "bcryptjs";
import Provider from '../../infrastructure/dbModels/serviceProvider';
import User from '../../infrastructure/dbModels/user';
import Booking from "../../infrastructure/dbModels/booking";
import mongoose from 'mongoose';

const findAllProviders = async (): Promise<any> => {
    const providers = await Provider.find(); 
    if (!providers || providers.length === 0) {
      console.warn("No providers found in the database.");
    }
    return providers;
};

const findAllUsers = async (): Promise<any> => {
    const users=await User.find(); 
if (!users || users.length === 0) {
  console.warn("No users found in the database.");
}
return users
}
const findAllBookings = async (): Promise<any> => {
  try {
    const bookings = await Booking.aggregate([
      {
        $lookup: {
          from: "users",
          //Defines a variable userId, 
          // which is the userId field from the Booking document converted to an ObjectId.
          let: { userId: { $toObjectId: "$userId" } },
          pipeline: [
            //Matches documents in the users collection where the _id 
            // field equals the userId variable.
            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }
          ],
          as: "userDetails",
        },
      }
      ,
      {
        $lookup: {
          from: "providers",
          let: { providerId: { $toObjectId: "$providerId" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$providerId"] } } }
          ],
          as: "providerDetails", 
        },
      },
    ]);

    if (!bookings || bookings.length === 0) {
      console.warn("No bookings found in the database.");
    }

    return bookings;
  } catch (error) {
    console.error("Error fetching bookings with user and provider details:", error);
    throw error;
  }
};

export const getDashboardDetails = async (): Promise<any> => {
  const totalBookings = await Booking.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalServiceProviders = await Provider.countDocuments();

  // Aggregate bookings by date
  const bookingsByDate = await Booking.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$selectedDate" },
          month: { $month: "$selectedDate" },
          day: { $dayOfMonth: "$selectedDate" },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
    },
  ]);

  // Aggregate bookings by time
  const bookingsByTime = await Booking.aggregate([
    {
      $group: {
        _id: "$selectedTime",
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
  ]);

  // Aggregate payment status
  const paymentStatus = await Booking.aggregate([
    {
      $group: {
        _id: "$payment.status",
        count: { $sum: 1 },
      },
    },
  ]);

  return {
    totalBookings,
    totalUsers,
    totalServiceProviders,
    bookingsByDate: {
      labels: bookingsByDate.map(
        (item) => `${item._id.year}-${item._id.month}-${item._id.day}`
      ),
      data: bookingsByDate.map((item) => item.count),
    },
    bookingsByTime: {
      labels: bookingsByTime.map((item) => item._id),
      data: bookingsByTime.map((item) => item.count),
    },
    paymentStatus: {
      labels: paymentStatus.map((item) => item._id),
      data: paymentStatus.map((item) => item.count),
    },
  };
};


export const updateUserBlockStatus = async (userId:string, isBlocked:boolean) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  const user = await User.findByIdAndUpdate(
    objectId,           
    { isBlocked },     
    { new: true }      
  );
  
  if (!user) throw new Error("User not found");
  return user;
};



export default { findAllProviders,findAllUsers,findAllBookings,getDashboardDetails,updateUserBlockStatus };
