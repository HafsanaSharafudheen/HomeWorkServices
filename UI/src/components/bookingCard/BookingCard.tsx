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
import ReviewDisplay from "../ReviewDisplay/ReviewDisplay";

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
        const response = await axios.post(`/deleteBooking`, {
          bookingId:bookingId, 
        }); 
              if (response.status === 200) {
          Swal.fire("Success", "Booking successfully canceled.", "success");
  
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
      console.log("Backend response:", response.data);
      console.log("Order ID being sent to Razorpay:", response.data.order.id);
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "HomeWorks",
        description: "Booking Service Fee",
        order_id: response.data.order.id,
      
        handler: async (paymentResponse: any) => {
          try {
            await axios.post("/updateBookingDetails", {
              bookingId,
              paymentResponse,
            });
            Swal.fire("Success", "Payment completed successfully.", "success");
            navigate("/paymentConfirmation", {
              state: {
                bookingId,
                providerId: provider?._id, 
              },
            });
            
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
    <div className="booking-card shadow-sm rounded border p-4 mb-4 w-100">
      <div className="row">
        {/* Left Section */}
        <div className="col-md-12">
          <p className="text-success fw-bold">{provider?.serviceCategory?.toUpperCase()}</p>
          <p>
            <FaCalendarAlt className="me-2 text-secondary" />
            {new Date(booking.selectedDate).toLocaleDateString()}
          </p>
          <p>
            <FaClock className="me-2 text-secondary" />
            {booking.selectedTime}
          </p>
          {provider && (
            <div>
<p className="text-success fw-bold">
<FaUser className="me-2 text-secondary" />
                {provider.fullName}
              </p>
              <p>
                <FaMoneyBillWave className="me-2 text-secondary" />
                ₹{provider.serviceCharge}
              </p>
            </div>
          )}
        </div>

        <div className="col-md-6">
  <ReviewDisplay reviewDetails={reviewDetails} />

  </div>

 

  
        {/* Right Section */}
        <div className="col-md-12">
        
  
            {/* Pending Status */}
            {booking.status === "pending" && (
            <>
<p className="text-danger fw-bold">
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
          {booking.status === "accepted" &&
            booking.payment.status === "pending" && (
              <div className="button-container">
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleCancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
                <button
                  className="btn btn-success"
                  onClick={() =>
                    handlePayment(
                      booking._id as string,
                      booking.providerDetails?.[0]?.serviceCharge || 0
                    )
                  }
                >
                  Pay Now
                </button>
              </div>
            )}
  
          {/* Rejected Status */}
          {booking.status === "rejected" && (
            <div className="rejected-overlay">
             <p className="text-danger fw-bold">
             Booking Rejected</p>
            </div>
          )}
  
          {/* Cancelled Status */}
          {booking.status === "cancelled" && (
            <div className="rejected-overlay">
             <p className="text-danger fw-bold">
             Booking Cancelled</p>
            </div>
          )}
        </div>
      </div>
      
      </div>
  );
};

export default BookingCard;