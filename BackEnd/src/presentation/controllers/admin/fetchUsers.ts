import { Request, Response } from "express";
import Admin from '../../../application/businesslogics/admin';


const fetchUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const search = req.query.search as string || "";
    const filter=req.query.filter as string||"";
  
  const { users, totalCount } = await Admin.findAllUsers(page, limit,search,filter);
  res.status(200).json({ users, totalCount });
} catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

export default fetchUsers;
