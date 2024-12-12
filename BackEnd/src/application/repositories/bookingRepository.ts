import Booking, { IBooking } from "../../infrastructure/dbModels/booking";

const saveBooking = async (bookingData: Partial<IBooking>): Promise<IBooking> => {
  const booking = new Booking(bookingData);
  return await booking.save();
};

export default { saveBooking };
