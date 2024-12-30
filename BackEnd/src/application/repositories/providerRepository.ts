import Provider from '../../infrastructure/dbModels/serviceProvider'
import Booking from '../../infrastructure/dbModels/booking';
import mongoose from 'mongoose';
const saveUser = async (providerData: any): Promise<any> => {
  const provider = new Provider(providerData);
  return provider.save();
};


export const fetchBookingsByDateRange = async (startDate: Date, endDate: Date) => {
  return await Booking.find({
    selectedDate: {
      $gte: startDate,
      $lte: endDate,
    },
  });
};


export const dataFetching = async (providerId: string) => {
  try {
      const bookings = await Booking.aggregate([
          {
              $match: { providerId: providerId }
          },
          {
              $addFields: {
                  userId: { $toObjectId: "$userId" } // Convert userId to ObjectId
              }
          },
          {
              $lookup: {
                  from: 'users',
                  localField: 'userId',
                  foreignField: '_id',
                  as: 'userDetails'
              }
          },
      ]);

      return bookings;
  } catch (error) {
      console.error('Error in data fetching:', error);
      throw new Error('Failed to fetch data.');
  }
};

export default { saveUser };