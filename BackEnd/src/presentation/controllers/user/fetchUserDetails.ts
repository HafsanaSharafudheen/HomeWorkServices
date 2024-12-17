import { fetchUserDetails } from "../../../application/businesslogics/user/fetchUserDetails";

export const getUserDetails = async (req: any, res: any) => {
  try {
    const userId = req.user.id; 
    const userDetails = await fetchUserDetails(userId);
    res.status(200).json({user:userDetails});
  } catch (error) {
    console.error('Error in getUserDetails:', error);
    res.status(500).json({ message: error });
  }
};
