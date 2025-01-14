import { useState, useEffect } from "react";
import { Booking } from "../../types/booking";
import ReviewComponent from "../review/ReviewComponent";
import { PayPalButtons } from "@paypal/react-paypal-js";

import {
  FaUser,
  FaClock,
  FaCalendarAlt,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaStar,
  FaWhatsapp,
} from "react-icons/fa";
import "./BookingCard.css";
import Swal from "sweetalert2";
import axios from "../../utilities/axios";

interface BookingProps {
  booking: Booking;
  fetchBookings: () => void;
}

interface ReviewDetails {
  ratings: number;
  message: string;
}

const BookingCard: React.FC<BookingProps> = ({ booking, fetchBookings }) => {
  const provider = booking.providerDetails?.[0];
  const [showReview, setShowReview] = useState<boolean>(false);
  const [reviewDetails, setReviewDetails] = useState<ReviewDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleCancelBooking = async (bookingId: string) => {
    if (!bookingId) {
      Swal.fire("Error", "Booking ID is required.", "error");
      return;
    }
  
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No, keep it",
    });
  
    if (confirm.isConfirmed) {
      try {
        const response = await axios.delete(`/deleteBooking`, {
          params: { bookingId },
        });        if (response.status === 200) {
          Swal.fire("Success", "Booking successfully canceled.", "success");
  
          // Optionally, update your UI or fetch bookings again
          fetchBookings();
        }
      } catch (error) {
        console.error("Error canceling booking:", error);
        Swal.fire("Error", "Failed to cancel booking. Please try again.", "error");
      }
    }
  };

  const handlePayment = async (bookingId: string,amount:number) => {
    try {
      // Create PayPal order
      const createOrderResponse = await axios.post("/createPayPalOrder", {
        bookingId:bookingId,
        amount: amount
      });
  
      const orderID = createOrderResponse.data.orderID;
  
      // Redirect to PayPal for user approval
      const approveUrl = `https://www.sandbox.paypal.com/checkoutnow?token=${orderID}`;
      window.location.href = approveUrl;
    } catch (error) {
      console.error("Error initiating payment:", error);
      Swal.fire("Error", "Failed to initiate payment. Please try again.", "error");
    }
  };
  const createOrder = async (bookingId: string,amount:number) => {
    const response = await axios.post("/createPayPalOrder",{
      bookingId:bookingId,
      amount: amount
    });
    return response.data.id;
  };

  const onApprove = async (bookingId: string, data: any) => {
    const response = await axios.post("/capturePayPalOrder", {
      orderId: data.orderID,
    });
    console.log("Payment Captured:", response.data);
  };
  

  // Fetch review details for the bookingId
  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/getReviewDetails?bookingId=${booking._id}&providerId=${booking.providerId}`
        );
        if (response.data && response.data.review) {
          setReviewDetails({
            ratings: response.data.review.ratings,
            message: response.data.review.message,
          });
        }
      } catch (error) {
        console.error("Error fetching review details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (booking.payment.status === "completed") {
      fetchReviewDetails();
    }
  }, [booking._id, booking.userId, booking.payment.status,booking.providerId]);

  return (
    <div className="card booking-card shadow-sm rounded border p-3 mb-4 mt-3">
      <div>
      <h6 className="text-success">{provider?.serviceCategory?.toUpperCase()}</h6>
      <p>
          <FaCalendarAlt className="me-2 text-secondary" />
          {new Date(booking.selectedDate).toLocaleDateString()}
        </p>
        <p>
          <FaClock className="me-2 text-secondary" />
          {booking.selectedTime}
        </p>
      </div>

      {provider && (
        <div>
          <p style={{color:'Green',fontWeight:"500"}}>
            <FaUser className="me-2 text-secondary" />
            {provider.fullName}
          </p>
          <p>
            <FaPhoneAlt className="me-2 text-secondary" />
            {provider.contactNumber}
          </p>
          <p>
            <FaWhatsapp className="me-2 text-secondary" />
             {provider.whatsappNumber}
          </p>
          <p>
            <FaMapMarkerAlt className="me-2 text-secondary" />
            {provider.address.city}, {provider.address.district} -{" "}
            {provider.address.pin}
          </p>
          <p>
            <FaMoneyBillWave className="me-2 text-secondary" />
            ₹{provider.serviceCharge}
          </p>
        </div>
      )}

      <div className="text-center">
        {booking.payment.status === "pending" && (
          <>
<button
  className="btn btn-danger me-2"
  onClick={() => handleCancelBooking(booking._id)}
>
  Cancel Booking
</button>
            <button className="btn btn-success"
              onClick={() => handlePayment(booking._id,booking.payment.amount)}
>Pay Now</button>

     
<PayPalButtons
  style={{ layout: "vertical" }}
  createOrder={async (data, actions) => {
    console.log("createOrder called");
    return createOrder(booking._id, booking.payment.amount);
  }}
  onApprove={async (data, actions) => {
    console.log("onApprove called");
    return onApprove(booking._id, data);
  }}
  onError={(err) => console.error("Payment Error:", err)}
/>



          </>
        )}

        {loading ? (
          <p>Loading review...</p>
        ) : reviewDetails ? (
          <div>
            <div className="mb-2">
              {/* Display Review Stars */}
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`me-1 ${
                    star <= reviewDetails.ratings ? "text-warning" : "text-secondary"
                  }`}
                />
              ))}
            </div>
            <p className="text-muted mb-1">{reviewDetails.message}</p>
            <button
              className="btn btn-link p-0"
              onClick={() => setShowReview(true)}
            >
              Update Review
            </button>
          </div>
        ) : showReview ? (
          <ReviewComponent
            bookingId={booking._id || ""}
            providerId={provider?._id || ""}
            onClose={() => setShowReview(false)}
          />
        ) : (
          booking.payment.status === "completed" && (
            <button
              className="btn btn-primary"
              onClick={() => setShowReview(true)}
            >
              Leave a Review
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default BookingCard;
