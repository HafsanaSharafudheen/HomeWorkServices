import { useState, useEffect } from "react";
import { Booking } from "../../../booking/types/booking";

export const useFilterBookings = (
  bookings: Booking[],
  searchTerm: string,
  filterType: string,
  selectedCategory: string,
  paymentStatus: string
) => {
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  useEffect(() => {
    let filtered = [...bookings];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.userDetails?.[0]?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.providerDetails?.[0]?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.providerDetails?.[0]?.serviceCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.payment.method.toLowerCase().includes(searchTerm.toLowerCase()) ||
          new Date(booking.selectedDate).toLocaleDateString().includes(searchTerm)
      );
    }

    // Apply alphabetical order filter
    if (filterType === "alphabetical") {
      filtered.sort((a, b) =>
        (a.userDetails?.[0]?.fullName || "").localeCompare(
          b.userDetails?.[0]?.fullName || ""
        )
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter(
        (booking) =>
          booking.providerDetails?.[0]?.serviceCategory === selectedCategory
      );
    }

    // Filter by payment status
    if (paymentStatus) {
      filtered = filtered.filter((booking) => booking.payment.status === paymentStatus);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, filterType, selectedCategory, paymentStatus]);

  return filteredBookings;
};
