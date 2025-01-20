import { updateBookingStatusByProvider } from "../../../application/businesslogics/provider";


const updateStatus = async (req: any, res: any): Promise<void> => {
    const bookingId=req.body.bookingId;
    const status=req.body.status;
  try {
    const provider = await updateBookingStatusByProvider(bookingId,status);


    return res.status(200).json({ message: "Details of provider found", profile: provider });
  } catch (error) {
    console.error("Error fetching profile details:", error);
    res.status(500).json({ message: "Error fetching profile details" });
  }
};



export default updateStatus;
