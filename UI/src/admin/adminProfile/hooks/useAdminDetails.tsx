import { useEffect, useState } from "react";
import { User } from "../../../User/types/user";
import axios from "../../../utilities/axios";


export const useAdminDetails = () => {
  const [adminDetails, setAdminDetails] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const response = await axios.get("/adminDetails");
        setAdminDetails(response.data);
      } catch (error) {
        setError("Failed to fetch admin details.");
        console.error("Error fetching admin details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, []);

  return { adminDetails, loading, error };
};
