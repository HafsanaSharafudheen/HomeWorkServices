import Provider from '../../infrastructure/dbModels/serviceProvider'
import Booking from '../../infrastructure/dbModels/booking';
import Diy from '../../infrastructure/dbModels/diy'
import mongoose from 'mongoose';
import { IDIY } from '../../infrastructure/dbModels/diy';
const saveUser = async (providerData: any): Promise<any> => {
  console.log("Incoming request data:", providerData);

  const provider = new Provider(providerData);
  return provider.save();
};


export const fetchBookingsByDateRange = async (startDate: Date, endDate: Date, providerId: string) => {
  return await Booking.find({
    providerId: providerId, 
    selectedDate: {
      $gte: new Date(startDate), 
      $lte: new Date(endDate),
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
          },  {
            $sort: { selectedDate: -1 } // Sort by latest booking first
        }
      ]);

      return bookings;
  } catch (error) {
      console.error('Error in data fetching:', error);
      throw new Error('Failed to fetch data.');
  }
};

export const saveDIYToDB = async (diyData: Partial<IDIY>) => {
  
  const diy = new Diy(diyData);
  return await diy.save();
};
export const findAllDiys= async(providerId:string)=>{
  const result = await Diy.find({ providerId :providerId});
return result
}

const findProviderByWhatsappNumber=async(whatsappNumber:string) => {
  return Provider.findOne({ "whatsappNumber":whatsappNumber });
}
export default { saveUser,findProviderByWhatsappNumber };