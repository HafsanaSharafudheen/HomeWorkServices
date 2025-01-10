import { fetchAdminProfileDetails } from "../../../application/businesslogics/admin";

export const fetchAdminDetails = async (req: any, res: any) => {
try{
const adminId = req.user?.id;

    // Validate adminId
    if (!adminId) {
      return res.status(400).json({ error: "Admin ID is not provided" });
    }

    // Fetch admin details
    const adminDetails = await fetchAdminProfileDetails(adminId);

    // If admin details not found
    if (!adminDetails) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Return the admin details
    return res.status(200).json(adminDetails);
  } catch (error) {
    console.error("Error fetching admin details:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};