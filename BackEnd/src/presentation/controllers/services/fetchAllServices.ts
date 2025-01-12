import Category from "../../../infrastructure/dbModels/category";
export const fetchAllServices = async (req: Request, res: any) => {
    try {
      const services = await Category.find(); 
      res.status(200).json({ servicesData: services });
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services." });
    }
  };
  export default fetchAllServices;