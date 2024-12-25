import { getDashboardDetails } from "../../../application/businesslogics/admin";

export const fetchDashboardData = async (req: Request, res: any): Promise<void> => {
    try {
      const data = await getDashboardDetails();
      res.json(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
