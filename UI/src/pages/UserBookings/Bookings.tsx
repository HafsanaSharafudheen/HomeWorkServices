import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./Bookings.css";
import BookingCard from "../../components/bookingCard/BookingCard";
import axios from "../../axios/axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("/bookingDetails");
        setBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <Header />
      <div className="bookingsPage">
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <h2>No Bookings Yet</h2>
            <p>It seems like you haven't made any bookings yet.</p>
          </div>
        ) : (
          <div className="bookingsContainer">
            <h3 className="headingStyle">Your Bookings</h3>
            <div className="bookingsGrid">
              {bookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Bookings;
