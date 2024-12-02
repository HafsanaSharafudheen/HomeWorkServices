import { Request, Response } from "express";
import Admin from '../../../application/businesslogics/admin';


const fetchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users=await Admin.findAllUsers()
    res.status(200).json({users:users});
  } catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

export default fetchUsers;
