import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./ServiceDetailsSidebar.css";
import { FaTimes } from "react-icons/fa";
import { Provider } from "../../types/provider";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "../../axios/axios";
import Swal from "sweetalert2"; 
import { useNavigate } from "react-router-dom";
import { RootState } from '../../../Redux/store';

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
  const user = useSelector((state: RootState) => state.user.user);

const navigate=useNavigate()
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleRequest = async() => {
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
            selectedDate: selectedDate.toISOString(),
            selectedTimeSlot: selectedTimeSlot,
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
                  {timeSlots.map((slot, index) => (
                    <div
                      key={index}
                      className={`col-md-6 time-slot ${
                        selectedTimeSlot === `${slot.start} - ${slot.end}` ? "selected" : ""
                      }`}
                      onClick={() => handleTimeSlotSelect(`${slot.start} - ${slot.end}`)}
                    >
                      {slot.start} - {slot.end}
                    </div>
                  ))}
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
          <div className="tab-pane active">
            <h5>Customer Feedback</h5>
            <p>No reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceDetailsSidebar;
