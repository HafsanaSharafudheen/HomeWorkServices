import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import ReviewComponent from "../../../../components/review/ReviewComponent";
function PaymentConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
  
    const { bookingId, providerId } = location.state || {};
  
    if (!bookingId || !providerId ) {
        Swal.fire("Error", "Missing required details.", "error");
        navigate("/"); 
        return null;
      }
   
    return (
      <div className="p-3">
        <h1 style={{ color: "#4CAF50", textAlign: "center" }}>Booking Confirmed</h1>
        <p style={{ textAlign: "center", fontSize: "14px" }}>
          Thank you for choosing HomeWorks! Your Payment is  successfully completed.
        </p>
        <p style={{ textAlign: "center", fontSize: "14px", marginTop: "10px" }}>
          We value your feedback! Please take a moment to leave a review for your service experience.
        </p>
  
        <ReviewComponent
        bookingId={bookingId}
        providerId={providerId}
        onClose={() => navigate("/YourBookings")} 
      />
         </div>
    );
  
}
export default PaymentConfirmation