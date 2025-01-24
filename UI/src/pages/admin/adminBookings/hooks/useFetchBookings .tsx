import { useState, useEffect } from "react";
import axios from "../../../../utilities/axios";
import { Booking } from "../../../../types/booking";


export const useFetchBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<{ bookings: Booking[] }>("/fetchAllBookings");
        const bookingsData = response.data.bookings;

        setBookings(bookingsData);

        const uniqueCategories = [
          ...new Set(
            bookingsData.map((booking) => booking.providerDetails?.[0]?.serviceCategory)
          ),
        ].filter((category) => category) as string[];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to fetch bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return { bookings, categories, loading, error };
};
