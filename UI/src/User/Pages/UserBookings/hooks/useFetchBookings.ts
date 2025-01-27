import { useState, useEffect } from "react";
import axios from "../../../../utilities/axios";

const useFetchBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/bookingDetails");
      setBookings(response.data.bookings);
    } catch (err: any) {
      console.error("Error fetching bookings:", err);
      setError("Failed to fetch bookings. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return { bookings, isLoading, error, fetchBookings };
};

export default useFetchBookings;
