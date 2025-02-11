
import BookingCard from "../../../booking/components/bookingCard/BookingCard";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import "./Bookings.css";

import useFetchBookings from "./hooks/useFetchBookings";

function Bookings() {
  const { bookings, isLoading,fetchBookings } = useFetchBookings();


  return (
    <>
      <Header />
   <hr></hr>
        <div className="row">
         
            
      <div className="bookingsPage">
      {isLoading ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
              <h2 className="fw-bold">Loading your bookings...</h2>
            </div>
          </div>
          
          ):
        bookings.length === 0 ? (
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
