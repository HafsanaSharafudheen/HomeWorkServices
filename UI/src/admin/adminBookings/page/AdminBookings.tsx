import { useState,  } from "react";
import "./adminBookings.css";
import SideBar from "../../adminDashboard/page/sideBar/SideBar";
import {  FaUsers, FaCheckCircle } from "react-icons/fa";
import { Booking } from "../../../booking/types/booking";
import { useFetchBookings } from "../hooks/useFetchBookings ";
import { useFilterBookings } from "../hooks/useFilterBookings ";
import axios from "../../../utilities/axios";

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const { bookings, categories, loading, error, refetchBookings } = useFetchBookings();
  const filteredBookings = useFilterBookings(
    bookings,
    searchTerm,
    filterType,
    selectedCategory,
    paymentStatus
  );

 
  
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredBookings.length / bookingsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleTransferPayment = async (booking: Booking) => {
    try {
      const response = await axios.post("/transferDate", { booking });
      console.log("Payout successful:", response.data);
  
      refetchBookings();
    } catch (error) {
      console.error("Error transferring payment:", error);
      alert("Failed to transfer payment. Please try again.");
    }
  };
  
  
  return (
    <div className="row admin-bookings-container">
      <div className="col-lg-3 col-md-4 col-sm-12">
        <SideBar />
      </div>

      <div className="col-lg-9 col-md-8 col-sm-12">
        <h2 className="headingStyle my-4">Booking Details</h2>

        {loading && <p>Loading bookings...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3 totalCount">
              <div className="d-flex align-items-center">
                <FaUsers className="me-2 text-primary" />
                <h6>Total Bookings: {filteredBookings.length}</h6>
              </div>
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Search by name, category, date, or status"
                  className="form-control me-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="form-select me-3"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <select
                  className="form-select"
                  onChange={(e) => setPaymentStatus(e.target.value)}
                >
                  <option value="">All Payment Status</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
        <div className="table-responsive">
          <table className="bookingstable table">
            <thead>
              <tr>
                <th>User</th>
                <th>Provider</th>
                <th>Category</th>
                <th>Service Charge</th>

                <th>Booking Date</th>
                <th>Booked At</th>
                <th>Working Status</th>
                <th>Payment Status</th>
                <th>Payment</th>
                <th>view Details</th>

              </tr>
            </thead>
            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => {
                  const paymentTime = booking.payment.time
                    ? new Date(booking.payment.time)
                    : null;
                  const transferDate = paymentTime
                    ? new Date(
                        paymentTime.getTime() + 3 * 24 * 60 * 60 * 1000
                      )
                    : null;
                  const canTransfer =
                    paymentTime &&
                    new Date().getTime() - paymentTime.getTime() >=
                      3 * 24 * 60 * 60 * 1000;

                  return (
                    <tr key={booking._id}>
                      <td>{booking.userDetails?.[0]?.fullName || "N/A"}</td>
                      <td>{booking.providerDetails?.[0]?.fullName || "N/A"}</td>
                      <td>{booking.providerDetails?.[0]?.serviceCategory || "N/A"}</td>
                      <td>{booking.providerDetails?.[0]?.serviceCharge || "N/A"}</td>

                      <td>{new Date(booking.selectedDate).toLocaleDateString()}</td>
                      <td>
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
  {booking.status === "completed" ? (
    <p className="text-success">Completed</p>
  ) : booking.status === "rejected" ? (
    <p className="text-danger">Rejected</p>
  ) : (
    <p className="text-warning">In Progress</p>
  )}
</td>

                      <td>
                        {booking.payment.status === "completed" ? (
                          <p>
                            <FaCheckCircle className="me-1 text-success" />
                            Payment Done on:{" "}
                            {paymentTime?.toLocaleDateString() || "N/A"}
                          </p>
                        ) : (
                          <p className="text-danger">Pending</p>
                        )}
                      </td>
                      <td>
  {booking.payment.status === "completed" && booking.payment.releasedDate ? (
    <div>
      <p className="text-success">
        Payment Transferred on:{" "}
        {new Date(booking.payment.releasedDate).toLocaleDateString()}
      </p>
      <button className="btn btn-secondary btn-sm" disabled>
        Marked as Transferred
      </button>
    </div>
  ) : (
    <div>
      {booking.payment.status === "completed" ? (
        <button
          className="btn btn-success btn-sm"
          onClick={() => handleTransferPayment(booking)}
        >
          Transfer Payment
        </button>
      ) : (
        <p className="text-secondary">No Transfer Date</p>
      )}
    </div>
  )}
</td>


                      <td>
                      <td>
  <a
    href="#"
    className="text-primary"
    onClick={(e) => {
      e.preventDefault();
      handleViewDetails(booking);
    }}
  >
    View Details
  </a>
</td>

                    </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

</>
 )}
 </div>

        <div className="pagination d-flex align-items-center justify-content-center">
          <button
            className="btn btn-sm btn-primary mx-2"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span className="mx-3">{currentPage}</span>
          <button
            className="btn btn-sm btn-primary mx-2"
            disabled={
              currentPage === Math.ceil(filteredBookings.length / bookingsPerPage)
            }
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
        {selectedBooking && (
  <div className="modal show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-lg modal-dialog-scrollable">
      <div className="modal-content p-2">
      
        <div className="modal-body p-3">
          {/* Row for Booking Details and Payment Details */}
          <div className="row">
            {/* Booking Details */}
            <div className="col-md-6">
              <h6><strong>Booking Details:</strong></h6>
              <ul className="list-unstyled">
                <li><strong>User:</strong> {selectedBooking.userDetails?.[0]?.fullName || "N/A"}</li>
                <li><strong>Provider:</strong> {selectedBooking.providerDetails?.[0]?.fullName || "N/A"}</li>
                <li><strong>Category:</strong> {selectedBooking.providerDetails?.[0]?.serviceCategory || "N/A"}</li>
                <li><strong>Booking Date:</strong> {new Date(selectedBooking.selectedDate).toLocaleDateString()}</li>
                <li><strong>Booked At:</strong> {new Date(selectedBooking.createdAt).toLocaleDateString()}</li>
              </ul>
            </div>

            {/* Payment Details */}
            <div className="col-md-6">
              <h6><strong>Payment Details:</strong></h6>
              <ul className="list-unstyled">
                <li><strong>Amount:</strong> ₹{selectedBooking.payment.amount}</li>
                <li><strong>Paid At:</strong> {selectedBooking.payment.time ? new Date(selectedBooking.payment.time).toLocaleString() : "N/A"}</li>
                <li><strong>Payment Method:</strong> {selectedBooking.payment.method || "N/A"}</li>
                <li>
                  <strong>Status:</strong>{" "}
                  {selectedBooking.payment.status === "completed" ? (
                    <span className="text-success">Completed</span>
                  ) : (
                    <span className="text-danger">Pending</span>
                  )}
                </li>
              </ul>
              {selectedBooking.payment.status === "completed" && (
                <p className="text-danger">
                  <strong>Eligible for Transfer On:</strong>{" "}
                  {new Date(new Date(selectedBooking.payment.time).getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Working Updates */}
          <div>
            <div className="row">
              {selectedBooking.workingUpdates?.map((update, idx) => (
                <div key={idx} className="col-md-3">
                  <div className="card">
                    <div className="card-body">
                      <h6 className="card-title"><strong>{update.title}</strong></h6>
                      <p className="card-text">{update.description}</p>
                      <div className="row">
                        {/* Photos */}
                        {update.photos.map((photo, index) => (
                          <div className="col-12" key={index}>
                            <img
                              src={`${import.meta.env.VITE_API_BASEURL}/${photo}`}
                              alt={`Work Photo ${index + 1}`}
                              className="img-thumbnail"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="row">
                        {/* Videos */}
                        {update.videos.map((video, index) => (
                          <div className="col-12" key={index}>
                            <video
                              src={`${import.meta.env.VITE_API_BASEURL}/${video}`}
                              controls
                              className="w-100 rounded"
                            ></video>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}


      </div>
  
  
  );
};

export default AdminBookings;
