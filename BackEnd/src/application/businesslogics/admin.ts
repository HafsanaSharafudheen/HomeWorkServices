import bcrypt from "bcryptjs";
import Provider from '../../infrastructure/dbModels/serviceProvider';
import User from '../../infrastructure/dbModels/user';
import Booking from "../../infrastructure/dbModels/booking";

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


export default { findAllProviders,findAllUsers,findAllBookings  };
