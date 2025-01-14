import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";


import "./ServiceDetailsSidebar.css";
import { FaTimes } from "react-icons/fa";
import { Provider } from "../../types/provider";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../utilities/axios";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";
import { RootState } from '../../../Redux/store';
import StarRating from '../StarRating';

const timeSlots = [
  { start: "9:00 AM", end: "11:00 AM" },
  { start: "11:00 AM", end: "1:00 PM" },
  { start: "2:00 PM", end: "4:00 PM" },
  { start: "4:00 PM", end: "6:00 PM" },
];

const ServiceDetailsSidebar: React.FC<{ provider: Provider; onClose: () => void }> = ({ provider, onClose }) => {
  const [selectedTab, setSelectedTab] = useState<string>("slots");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const user = useSelector((state: RootState) => state.user.user);

const navigate=useNavigate()
const handleDateChange = (date: Date) => {
  const selectedDate = new Date(date);
  selectedDate.setHours(0, 0, 0, 0); // Set to midnight in local time

  // Convert to UTC for consistency
  const utcDate = new Date(
    Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate())
  );

  setSelectedDate(utcDate);
  console.log("Selected Date (Frontend, UTC):", utcDate);
};


  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!selectedDate) return;
      const formattedDate = selectedDate.toISOString().split("T")[0];
      try {
        const response = await axios.get(`/bookingsSlot`, {
          params: {
            providerId: provider._id,
            selectedDate: formattedDate,
          },
        });
        setBookedSlots(response.data.bookings.map((booking: any) => booking.selectedTime));
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate, provider._id]);


  const handleTimeSlotSelect = (timeSlot: string) => {
    if (!bookedSlots.includes(timeSlot)) {
      setSelectedTimeSlot(timeSlot);
    }
  };

  const handleRequest = async() => {
    if (!provider.isAvailable) {
      Swal.fire(
        "Provider Unavailable",
        "The provider is currently unavailable. Please select another provider.",
        "warning"
      );
      return;
    }
  
    if (!user) {
      // Save current data in localStorage
      localStorage.setItem(
        "redirectAfterLogin",
        JSON.stringify({
          provider: provider, 
          selectedTab,
          selectedDate: selectedDate ? selectedDate.toISOString() : null,
          selectedTimeSlot,
        })
    );
    
      Swal.fire({
        title: "Login Required",
        text: "You need to log in to request a service.",
        icon: "info",
        confirmButtonText: "OK",
        customClass: {
          popup: "small-text-swal-popup",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
    
      return;
    }
    
    
    if (!selectedDate || !selectedTimeSlot) {
        Swal.fire("Error", "Please select a date and time slot before booking.", "error");
        return;
      }
      try {
        const response = await axios.post("/booking",
        {   providerId: provider._id,
            selectedDate: selectedDate,
            amount:provider.serviceCharge,
            selectedTime: selectedTimeSlot,
        });
  
        if (response.status === 201) {
         
         navigate('/')
          Swal.fire("Booking Confirmed", "Your booking is confirmed. We will reach out to you soon.", "success");
        } else {
          throw new Error("Failed to confirm booking");
        }
      } catch (error) {
        Swal.fire("Error", "An error occurred while booking. Please try again later.", "error");
      }
    };


  return (
    <div className="serviceDetailsSidebar">
      <div className="row">
  <div className="col-md-12">
    <ul className="nav nav-tabs align-items-center">
      <li className="nav-item">
        <button
          className={`nav-link ${selectedTab === "slots" ? "active" : ""}`}
          onClick={() => setSelectedTab("slots")}
        >
          Available Slots
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${selectedTab === "samples" ? "active" : ""}`}
          onClick={() => setSelectedTab("samples")}
        >
          Work Samples
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${selectedTab === "feedback" ? "active" : ""}`}
          onClick={() => setSelectedTab("feedback")}
        >
          Customer Feedback
        </button>
      </li>
      <li>
        <button className="btn btn-sm btn-danger" onClick={onClose}>
          <FaTimes />
        </button>
      </li>
    </ul>
  </div>
</div>

    

      {/* Tab Content */}
      <div className="tab-content p-3">
        {selectedTab === "slots" && (
          <div className="tab-pane active">
            <div className="calendar-container">
              <Calendar value={selectedDate} onChange={handleDateChange} />
            </div>
            {selectedDate && (
             <div className="time-slots-container mt-3">
             <div className="row">
               {timeSlots.map((slot, index) => {
                 const slotLabel = `${slot.start} - ${slot.end}`;
                 const isBooked = bookedSlots.includes(slotLabel);
                 const isSelected = selectedTimeSlot === slotLabel;
           
                 return (
                   <div
                     key={index}
                     className={`col-md-6 time-slot ${
                       isBooked ? "disabled" : isSelected ? "selected" : ""
                     }`}
                     onClick={() => !isBooked && handleTimeSlotSelect(slotLabel)}
                   >
                     {slot.start} - {slot.end}
                   
                   </div>
                 );
               })}
             </div>
           </div>
           
            )}
            {selectedDate && selectedTimeSlot && (
              <div className="selected-info mt-3">
                <p>
                  {selectedDate.toDateString()} at {selectedTimeSlot}
                </p>
              </div>
            )}
            <button onClick={handleRequest} className="DefaultButton mt-3">
              Request Service
            </button>
          </div>
        )}
        {selectedTab === "samples" && (
          <div className="tab-pane active">
            <h5>Work Samples</h5>
            <div className="sample-gallery">
              <p>Sample works will appear here.</p>
            </div>
          </div>
        )}
      {selectedTab === "feedback" && (
          <div style={{fontSize:"12px"}}>
            <h6>Customer Feedback</h6>
            
       <div className="provider-rating mt-3">
        <p>
          <StarRating
            rating={provider.averageRating || 0}
            totalReviews={provider.totalReviews || 0}
            showRatingText={true}
          />
        </p>
      </div> 
            {provider.reviews.length > 0 ? (
              provider.reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <p>
                    <strong>{review.userDetails?.fullName || "Anonymous"}</strong>
                  </p>
                  <StarRating rating={review.ratings} showRatingText={false} />
                  <p>{review.message}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default ServiceDetailsSidebar;