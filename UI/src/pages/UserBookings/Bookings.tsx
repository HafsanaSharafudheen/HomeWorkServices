// pages/Bookings.tsx
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './Bookings.css'; 
import BookingCard from '../../components/bookingCard/BookingCard';
import axios from '../../axios/axios';

function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/bookingDetails');
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <>
      <Header />
      <div className="bookings-page">
        <div className="bookings-container">
          <h1>Your Bookings</h1>
          <div className="bookings-grid">
            {bookings&& bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Bookings;
