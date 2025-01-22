import booking from "../../../infrastructure/dbModels/booking";

export const AllSamples = async (providerId:string) => {
  try {
    // Ensure providerId is valid
    if (!providerId) {
      throw new Error("Provider ID is missing.");
    }

    const samples = await booking.find({ providerId:providerId }); 

    return samples;
    
  } catch (error) {
    console.error("Error fetching AllSamples:", error);
    throw new Error("Failed to fetch AllSamples.");
  }
};
