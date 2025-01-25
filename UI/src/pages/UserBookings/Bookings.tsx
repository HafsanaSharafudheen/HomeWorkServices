import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./Bookings.css";
import BookingCard from "../../components/bookingCard/BookingCard";
import axios from "../../utilities/axios";
import Profile from "../Profile/Profile";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => {
    try {
      const response = await axios.get("/bookingDetails");
      setBookings(response.data.bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };
  useEffect(() => {
   

    fetchBookings();
  }, []);

  return (
    <>
      <Header />
   <hr></hr>
        <div className="row">
         
            
      <div className="bookingsPage">
        {bookings.length === 0 ? (
          <div className="no-bookings text-center">
            <h2>No Bookings Yet</h2>
            <p>It seems like you haven't made any bookings yet.</p>
          </div>
        ) : (
          <div>
                     <h3 className="headingStyle">Your Bookings</h3>

                     {bookings.map((booking) => (
                                           <div className="col-12 mb-4" key={booking?._id}>

                <BookingCard key={booking?._id} booking={booking}  fetchBookings={fetchBookings}/>
                </div>

              ))}
            </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}

export default Bookings;
