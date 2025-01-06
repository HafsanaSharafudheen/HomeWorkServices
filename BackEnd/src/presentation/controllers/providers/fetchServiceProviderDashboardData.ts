import { getDashboardData, fetchDataWithDate } from '../../../application/businesslogics/provider';

export const fetchServiceProviderDashboardData = async (req: any, res: any): Promise<void> => {
  const providerId = req.user?.id; // Ensure `req.user.id` exists

  if (!providerId) {
    return res.status(400).json({ message: "Provider ID is required" });
  }

  try {
    const data = await getDashboardData(providerId);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


  export const fetchDashboardDataWithDate=async(req:any,res:any): Promise<void> => {

    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Start date and end date are required" });
    }
  
    try {
      const data = await fetchDataWithDate(new Date(startDate), new Date(endDate));
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  }
