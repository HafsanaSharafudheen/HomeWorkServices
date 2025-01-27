import Razorpay from "razorpay";
import Booking from "../../../infrastructure/dbModels/booking";
import dotenv from "dotenv";
dotenv.config();

export const razorpayBooking = async (req: any, res: any) => {
    const { amount, currency, bookingId } = req.body;
  
    if (!amount || !currency || !bookingId) {
      return res.status(400).json({ success: false, message: "Invalid input parameters." });
    }
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!keyId || !keySecret) {
      throw new Error("Razorpay key ID or secret is missing from the environment variables.");
    }
    
    const razorpay = new Razorpay({
      key_id: keyId as string,
      key_secret: keySecret as string,
    });
    

  
    try {
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
        
      });
  
      const options = {
        amount: amount *100,
        currency,
        receipt: `receipt_${bookingId}`,
      };
  
      const order = await razorpay.orders.create(options);
  
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          $set: {
            "payment.status": "completed",
            "payment.method": "online",
            "payment.time":new Date()
          },
        },
        { new: true }
      );      if (!booking) {
        return res.status(404).json({ success: false, message: "Booking not found." });
      }
  
      res.status(200).json({
        success: true,
        order,
        booking,
      });
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ success: false, message: "Failed to create Razorpay order." });
    }
  };

  export const razorpayPaymentToBankAccount = async (req: any, res: any) => {
    try {
      const { booking } = req.body;
  
      // Find the booking by ID
      const existingBooking = await Booking.findById(booking._id);
  
      if (!existingBooking) {
        return res.status(404).json({ error: "Booking not found" });
      }
  
      if (existingBooking.payment.status !== "completed") {
        return res
          .status(400)
          .json({ error: "Payment status is not eligible for transfer" });
      }
  
      // Update the releasedDate to the current date
      const currentDate = new Date();
      existingBooking.payment.releasedDate = currentDate;
  
      // Save the updated booking back to the database
      await existingBooking.save();
  
      console.log("Updated Booking:", existingBooking);
  
      res.status(200).json({ message: "Payment transferred", booking: existingBooking });
    } catch (error) {
      console.error("Error updating payment release date:", error);
      res.status(500).json({ error: "Failed to update payment release date" });
    }
  };