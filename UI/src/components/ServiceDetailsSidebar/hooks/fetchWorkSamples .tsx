import { useState } from "react";
import axios from "../../../utilities/axios";
import { Booking } from "../../../types/booking";

const useWorkSamples = () => {
    const [workSamples, setWorkSamples] = useState<Partial<Booking>[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchWorkSamples = async (providerId: string) => {
      setLoading(true);
      setError(null); // Clear previous errors
      try {
        const response = await axios.get(`/workSamples/${providerId}`);
  
        // Check if response contains samples
        if (response.status === 200 && response.data.samples) {
          setWorkSamples(response.data.samples);
        }
      } catch (error: any) {
        // Handle 404 Not Found explicitly
        if (error.response && error.response.status === 404) {
          setError(error.response.data.message); // Show "No work samples found"
        } else {
          setError("Failed to fetch work samples. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    return {
      workSamples,
      loading,
      error,
      fetchWorkSamples,
    };
  };
  
  export default useWorkSamples;
  