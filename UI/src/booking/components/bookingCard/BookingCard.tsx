import { useState, useEffect } from "react";
import { Booking } from "../../types/booking";

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

import { useNavigate } from "react-router-dom";
import axios from "../../../utilities/axios";
import ReviewDisplay from "../../../Reviews/components/ReviewDisplay/ReviewDisplay";

interface BookingProps {
  booking: Booking;
  fetchBookings: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface ReviewDetails {
  ratings: number;
  message: string;
  workImage:string[];
  workVideo:string[];
}

const BookingCard: React.FC<BookingProps> = ({ booking, fetchBookings }) => {
  const provider = booking.providerDetails?.[0];
  // const [showReview, setShowReview] = useState<boolean>(false);
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
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        console.log("✅ Razorpay script already loaded.");
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        if (window.Razorpay) {
          console.log("✅ Razorpay script loaded successfully.");
          resolve(true);
        } else {
          console.error("❌ Razorpay script loaded but not available in window.");
          resolve(false);
        }
      };

      script.onerror = () => {
        console.error("❌ Failed to load Razorpay script.");
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);


  const handlePayment = async (bookingId: string, amount: number, provider?: any) => {
    console.log("Amount:", amount);
    console.log("Booking ID:", bookingId, "Amount:", amount);

    try {
      if (!bookingId) {
        throw new Error("❌ Booking ID is missing.");
      }

      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        Swal.fire("Error", "❌ Failed to load Razorpay. Please refresh and try again.", "error");
        console.error("❌ Razorpay is still not available after script load.");
        return;
      }

      const paymentData = {
        amount: amount,
        currency: "INR",
        bookingId: bookingId,
      };

      const response = await axios.post("/razorpay", paymentData);
      console.log("✅ Backend response:", response.data);

      const orderId = response.data?.order?.id;
      if (!orderId) {
        throw new Error("❌ Invalid order ID received from backend.");
      }
      console.log("✅ Order ID being sent to Razorpay:", orderId);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "HomeWorks",
        description: "Booking Service Fee",
        order_id: orderId,

        handler: async (paymentResponse: any) => {
          try {
            await axios.post("/updateBookingDetails", { bookingId, paymentResponse });
            Swal.fire("✅ Success", "Payment completed successfully.", "success");
            navigate("/paymentConfirmation", { state: { bookingId, providerId: provider?._id } });
          } catch (error) {
            console.error("❌ Error updating booking details:", error);
            Swal.fire("Error", "❌ Failed to update booking details.", "error");
          }
        },
        modal: {
          ondismiss: () => {
            Swal.fire("⚠ Cancelled", "Payment process was cancelled.", "info");
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Error initiating payment:", error);
      Swal.fire("Error", error.message || "❌ Failed to initiate payment. Please try again.", "error");
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
        if (response.data && response.data.review as ReviewDetails) {
          setReviewDetails({
            ratings: response.data.review.ratings ?? 0,
            message: response.data.review.message,
            workImage: response.data.review.workImage ??[],
            workVideo: response.data.review.workVideo ?? [],
          });
        }
      } catch (error) {
        console.error("Error fetching review details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (booking.payment?.status === "completed") {
      fetchReviewDetails();
    }
  }, [booking._id, booking.userId, booking.payment?.status,booking.providerId]);

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
{reviewDetails &&
        <div className="col-md-6">
  <ReviewDisplay reviewDetails={reviewDetails} />

  </div>
}

 

  
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