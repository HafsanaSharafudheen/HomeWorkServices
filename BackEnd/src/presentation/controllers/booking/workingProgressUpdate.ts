import booking from "../../../infrastructure/dbModels/booking";

export const workingProgressUpdate = async (req: any, res: any) => {

    try {
        const { bookingId, title, description } = req.body;
        const photos = req.files?.photos
          ? (req.files.photos as Express.Multer.File[]).map((file) => file.path)
          : [];
        const videos = req.files?.videos
          ? (req.files.videos as Express.Multer.File[]).map((file) => file.path)
          : [];
  
        const update = {
          title,
          description,
          photos,
          videos,
          time: new Date(),
        };
  
        const updatedBooking = await booking.findByIdAndUpdate(
          bookingId,
          { $push: { workingUpdates: update } },
          { new: true }
        );
  
        if (!updatedBooking) {
          return res.status(404).json({ message: "Booking not found" });
        }
  
        res.status(200).json({ message: "Work updates added successfully", booking: updatedBooking });
      } catch (error) {
        console.error("Error updating work details:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    
}
