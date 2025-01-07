import booking from '../../infrastructure/dbModels/booking';
import Provider, { IProvider } from '../../infrastructure/dbModels/serviceProvider';
import { aggregateBookingsByDate, aggregatePaymentStatus, countBookings } from '../repositories/bookingRepository';
import { dataFetching, fetchBookingsByDateRange, findAllDiys, saveDIYToDB } from '../repositories/providerRepository';
import { IDIY } from '../../infrastructure/dbModels/diy';

const findProviderById = async (id: string): Promise<IProvider> => {
  const provider = await Provider.findOne({ _id: id });
  console.log("provider from the finproviderby id", provider);
  if (!provider) {
    throw new Error("No service provider found");
  }
  return provider;
};

const updateProviderProfile = async (
  userId: string,
  updateData: Record<string, any>
): Promise<any> => {
  const result = await Provider.updateOne({ _id: userId }, { $set: updateData });

  if (!result || result.modifiedCount === 0) {
    throw new Error("No service provider found or no changes made");
  }

  return result;
};



const findAllProvidersByCategory = async ( serviceCategory: string ): Promise<any> => {
  // const providers = await Provider.find({
  //   serviceCategory: { $regex: new RegExp(serviceCategory, "i") }
  const providers = await Provider.aggregate([
    {
      $match: {
        serviceCategory: { $regex: new RegExp(serviceCategory, "i") }, // Match service category
      },
    },
    {
      $lookup: {
        from: "reviews", // Join with reviews collection
        let: { providerId: "$_id" }, // Pass provider's `_id` to the pipeline
        pipeline: [
          {
            $addFields: {
              providerId: { $toObjectId: "$providerId" }, // Convert providerId to ObjectId
            },
          },
          {
            $match: {
              $expr: { $eq: ["$providerId", "$$providerId"] }, // Match providerId in reviews
            },
          },
          {
            $addFields: {
              userId: { $toObjectId: "$userId" }, // Convert userId to ObjectId for matching
            },
          },
          {
            $lookup: {
              from: "users", // Join with users collection
              localField: "userId", // userId in reviews
              foreignField: "_id", // _id in users
              as: "userDetails", // Alias for the joined user data
            },
          },
          {
            $unwind: {
              path: "$userDetails", // Flatten the user details array
            },
          },
        ],
        as: "reviews", 
      },
    },
    {
      $addFields: {
        averageRating: { $ifNull: [{ $avg: "$reviews.ratings" }, 0] }, // Default to 0 if no ratings
        totalReviews: { $size: "$reviews" }, // Count total reviews
      },
    },
  ]);
  
  console.log("Providers with all fields and reviews:", providers);
  return providers;
};

export const updateProviderAvailable = async (
  userId: string,
  isAvailable: boolean
): Promise<any> => {
  try {
    const provider = await Provider.findById(userId);

    if (!provider) {
      throw new Error("No service provider found");
    }

    const result = await Provider.updateOne(
      { _id: userId },
      { $set: { isAvailable: isAvailable } }
    );

    if (!result || result.modifiedCount === 0) {
      throw new Error("Failed to update availability status");
    }

    return result;
  } catch (error) {
    console.error("Error updating availability:", error);
    throw error;
  }
};

export const getDashboardData = async (providerId: string) => {
  try {
    // Fetch total bookings for the provider
    const totalBookings = await booking.countDocuments({ providerId });

    // Aggregate bookings by date
    const bookingsByDate = await booking.aggregate([
      { $match: { providerId } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Aggregate payment statuses
    const paymentStatus = await booking.aggregate([
      { $match: { providerId } },
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    return {
      totalBookings,
      bookingsByDate: {
        labels: bookingsByDate.map(
          (item) => `${item._id.year}-${item._id.month}-${item._id.day}`
        ),
        data: bookingsByDate.map((item) => item.count),
      },
      paymentStatus: {
        labels: paymentStatus.map((item) => item._id),
        data: paymentStatus.map((item) => item.count),
      },
    };
  } catch (error) {
    console.error("Error aggregating dashboard data:", error);
    throw new Error("Failed to aggregate dashboard data");
  }
};

export const fetchDataWithDate = async (startDate: Date, endDate: Date) => {
  // Fetch bookings within the date range
  const bookings = await fetchBookingsByDateRange(startDate, endDate);

  // Count total bookings-----To provide a quick summary of the total bookings
  const totalBookings = bookings.length;

  //Initializes an object to store the count of bookings for 
  // each payment status (pending, completed, and cancelled). 
  
   const paymentStatusCounts: Record<"pending" | "completed" | "cancelled", number> = {
    pending: 0,
    completed: 0,
    cancelled: 0,
  };
//Loops through each booking in the bookings array.
  bookings.forEach((booking) => {
    if (booking.payment.status === "pending" || 
        booking.payment.status === "completed" || 
        booking.payment.status === "cancelled") {
          // Increments the respective status count in paymentStatusCounts
      paymentStatusCounts[booking.payment.status] += 1;
    }
  });

//Initializes an empty object to store the count of bookings for each date.
  const bookingsByDate: Record<string, number> = {};

  // Count bookings for each date
  bookings.forEach((booking) => {
    //Converts the selectedDate of the booking into a YYYY-MM-DD string format.
    const date = booking.selectedDate.toISOString().split("T")[0]; 
    //Increments the count for that date in bookingsByDate. 
    // If the date is not already in the object, it initializes it to 0 before adding 1.

    bookingsByDate[date] = (bookingsByDate[date] || 0) + 1;
  });

  return {
    totalBookings,
    bookingsByDate: {
      labels: Object.keys(bookingsByDate), //An array of all unique dates 
      data: Object.values(bookingsByDate), // An array of counts for each date
    },
    paymentStatus: {
      labels: Object.keys(paymentStatusCounts), // An array of all payment statuses
      data: Object.values(paymentStatusCounts), //: An array of counts for each payment status.
    },
  };
};

export const findAllBookingsData = async (providerId: string) => {
  try {
      const bookings = await  dataFetching(providerId);
      return bookings;
  } catch (error) {
      console.error("Error fetching bookings from the database:", error);
      throw new Error("Failed to fetch bookings.");
  }
}

export const updateBookingStatusByProvider=async(bookingId:string)=>{
  try {
    await booking.findOneAndUpdate(
      { _id: bookingId }, 
      { $set: { status: "completed" } }, 
    );
    console.log(`Booking with ID ${bookingId} status updated to accepted.`);
  } catch (error) {
    console.error(`Error updating booking status: ${error}`);
    throw error; 
  }
}
export const createDIYService = async (diyData: IDIY) => {
  return await saveDIYToDB(diyData);
};
export const searchDIYS=async(providerId:string)=>{
  return findAllDiys(providerId);

}

export default {
  findProviderById,findAllBookingsData,updateBookingStatusByProvider,
  updateProviderProfile,getDashboardData,fetchDataWithDate,
  findAllProvidersByCategory,updateProviderAvailable,createDIYService
};
