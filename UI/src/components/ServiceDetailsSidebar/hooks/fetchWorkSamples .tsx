import { useState } from "react";
import axios from "../../../utilities/axios";
import Swal from "sweetalert2";
import { Booking } from "../../../types/booking";

const useWorkSamples = () => {
    const [workSamples, setWorkSamples] = useState<Partial<Booking>[]>([]);
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkSamples = async (providerId: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/workSamples/${providerId}`);
      setWorkSamples(response.data.samples || []);
    } catch (error) {
      console.error("Error fetching work samples:", error);
      setError("Failed to fetch work samples. Please try again.");
      Swal.fire("Error", "Failed to fetch work samples. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    workSamples,
    loading,
    error,
    fetchWorkSamples, 
  }
};

export default useWorkSamples;
