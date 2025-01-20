import { useState, useEffect } from "react";
import { Booking } from "../../types/booking";
import ReviewComponent from "../review/ReviewComponent";

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
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import axios from "../../utilities/axios";

interface BookingProps {
  booking: Booking;
  fetchBookings: () => void;
}



interface ReviewDetails {
  ratings: number;
  message: string;
  workImage:string[];
  workVideo:string[];
}

const BookingCard: React.FC<BookingProps> = ({ booking, fetchBookings }) => {
  const provider = booking.providerDetails?.[0];
  const [showReview, setShowReview] = useState<boolean>(false);
  const [reviewDetails, setReviewDetails] = useState<ReviewDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
const navigate=useNavigate()
  const user = useSelector((state: RootState) => state.user.user);

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



  
  const handlePayment = async (bookingId: string, amount: number) => {
    console.log("Amount:", amount);

    console.log(bookingId,"bookinnnnnnnnnnnn",amount,'...amount')
    try {
      if (!bookingId) {
        throw new Error("Booking ID is missing.");
      }
      
  
      const paymentData = {
        amount:amount,
        currency: "INR",
        bookingId:bookingId,
      };
  
      const response = await axios.post("/razorpay", paymentData);
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "HomeWorks",
        description: "Booking Service Fee",
        order_id: response.data.order.id,
        prefill: {
          name: user?.fullName || "Customer",
          email: user?.email || "example@example.com",
        },
        handler: async (paymentResponse: any) => {
          try {
            await axios.post("/updateBookingDetails", {
              bookingId,
              paymentResponse,
            });
            Swal.fire("Success", "Payment completed successfully.", "success");
            navigate(`/bookingConfirmation?bookingId=${bookingId}`);
          } catch (error) {
            console.error("Error updating booking details:", error);
            Swal.fire("Error", "Failed to update booking details.", "error");
          }
        },
        modal: {
          ondismiss: () => {
            Swal.fire("Cancelled", "Payment process was cancelled.", "info");
          },
        },
      };
  
      // Use `any` to bypass TypeScript's type checking for `window`
      const Razorpay = (window as any).Razorpay;
  
      if (typeof Razorpay === "function") {
        const rzp = new Razorpay(options);
        rzp.open();
      } else {
        throw new Error("Razorpay is not available. Ensure the Razorpay script is loaded.");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      Swal.fire("Error", "Failed to initiate payment. Please try again.", "error");
    }
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
            workImage: response.data.review.workImage,
            workVideo: response.data.review.workVideo,
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
  {/* Pending Status */}
  {booking.status === "pending" && (
    <>
      <p className="text-warning">
        Please wait for the acceptance of the serviceman.
      </p>
      <button
        className="btn btn-danger"
        onClick={() => handleCancelBooking(booking._id)}
      >
        Cancel Booking
      </button>
    </>
  )}

  {/* Accepted Status */}
  {booking.status === "accepted" && booking.payment.status === "pending" && (
    <>
      <button
        className="btn btn-danger me-2"
        onClick={() => handleCancelBooking(booking._id)}
      >
        Cancel Booking
      </button>
      <button
        className="btn btn-success"
        onClick={() =>
          handlePayment(booking._id as string, booking.providerDetails?.[0]?.serviceCharge || 0)
        }
      >
        Pay Now
      </button>
    </>
  )}

  {/* Rejected Status */}
  {booking.status === "rejected" && (
    <div className="rejected-overlay">
      <p className="text-danger">Booking Rejected</p>
    </div>
  )}

  {/* Review Section */}
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
      {reviewDetails.workImage && reviewDetails.workImage.length > 0 && (
  <div className="media-container">
    <h6>Images:</h6>
    <div className="media-grid">
      {reviewDetails.workImage.map((image, index) => (
        <img
          key={index}
          src={`${import.meta.env.VITE_API_BASEURL}/${image}`}
          alt={`Work Image ${index + 1}`}
          className="preview-image"
        />
      ))}
    </div>
  </div>
)}

{reviewDetails.workVideo && reviewDetails.workVideo.length > 0 && (
  <div className="media-container">
    <h6>Videos:</h6>
    <div className="media-grid">
      {reviewDetails.workVideo.map((video, index) => (
        <video
          key={index}
          src={`${import.meta.env.VITE_API_BASEURL}/${video}`}
          controls
          className="preview-video"
        />
      ))}
    </div>
  </div>
)}
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
      fetchBookings={fetchBookings}   
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
