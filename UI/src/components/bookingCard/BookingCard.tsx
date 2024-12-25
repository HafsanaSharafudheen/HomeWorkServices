import { useState, useEffect } from "react";
import { Booking } from "../../types/booking";
import ReviewComponent from "../review/ReviewComponent";
import axios from "../../axios/axios";
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

interface BookingProps {
  booking: Booking;
}

interface ReviewDetails {
  ratings: number;
  message: string;
}

const BookingCard: React.FC<BookingProps> = ({ booking }) => {
  const provider = booking.providerDetails?.[0];
  const [showReview, setShowReview] = useState<boolean>(false);
  const [reviewDetails, setReviewDetails] = useState<ReviewDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
            <button className="btn btn-danger me-2">Cancel Booking</button>
            <button className="btn btn-success">Pay Now</button>
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
