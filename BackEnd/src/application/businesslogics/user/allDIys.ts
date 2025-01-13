import diy from "../../../infrastructure/dbModels/diy";

export const allDiys = async () => {
  try {
    const diys = await diy.find();
    return diys; 
  } catch (error) {
    console.error("Error fetching DIYs:", error);
    throw new Error("Failed to fetch DIYs."); // Throw an error for the caller to handle
  }
};
