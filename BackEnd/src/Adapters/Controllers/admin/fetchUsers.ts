import { Request, Response } from "express";
import User from '../../../Entities/user';


const fetchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find(); 
    if (!users || users.length === 0) {
      console.warn("No users found in the database.");
    }
    console.log(users,"users array???")
    res.status(200).json({users:users});
  } catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

export default fetchUsers;
