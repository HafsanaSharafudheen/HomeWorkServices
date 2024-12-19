import React, { useState, useEffect } from "react";
import "./adminBookings.css";
import SideBar from "../adminDashboard/SideBar";
import axios from "../../../axios/axios";
import { FaFilter, FaUsers } from "react-icons/fa";
import { Booking } from "../../../types/booking";

const AdminBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bookingsPerPage] = useState(10);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<{ bookings: Booking[] }>("/fetchAllBookings");
        setBookings(response.data.bookings);
        setFilteredBookings(response.data.bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

  useEffect(() => {
    let filtered = [...bookings];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (booking) =>
          booking.userDetails?.[0]?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.providerDetails?.[0]?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          booking.payment.method.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply additional filters based on filterType
    if (filterType === "paymentTransfer") {
      filtered = filtered.filter((booking) => booking.payment.status !== "completed");
    } else if (filterType === "cancelled") {
      filtered = filtered.filter((booking) => booking.status === "cancelled");
    } else if (filterType === "category") {
      filtered = filtered.filter((booking) => booking.providerDetails?.[0]?.serviceCategory);
    }

    setFilteredBookings(filtered);
  }, [searchTerm, filterType, bookings]);

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

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

  return (
    <div className="row admin-bookings-container">
      {/* Sidebar */}
      <div className="col-lg-3 col-md-4 col-sm-12">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="col-lg-9 col-md-8 col-sm-12">
        <h2 className="table-title my-4">Booking Details</h2>

        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Total Bookings */}
          <div className="d-flex align-items-center">
            <FaUsers className="me-2 text-primary" />
            <span>Total Bookings: {filteredBookings.length}</span>
          </div>

          {/* Search and Filter */}
          <div className="d-flex align-items-center">
            <div className="form-floating me-3">
              <input
                type="text"
                id="searchInput"
                placeholder="Search"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="searchInput">Search</label>
            </div>

            {/* Filter Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-primary dropdown-toggle"
                type="button"
                id="filterDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaFilter className="me-2" />
                Filter
              </button>
              <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilterType("paymentTransfer")}
                  >
                    Payment Transfer
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilterType("cancelled")}
                  >
                    Cancelled Bookings
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilterType("category")}
                  >
                    Category Based
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilterType("")}
                  >
                    Clear Filter
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="bookingstable table">
            <thead>
              <tr>
                <th>User</th>
                <th>Provider</th>
                <th>Category</th>
                <th>Selected Date</th>
                <th>Selected Time</th>
                <th>Payment Status</th>
                <th>Amount</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.length > 0 ? (
                currentBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.userDetails?.[0]?.fullName || "N/A"}</td>
                    <td>{booking.providerDetails?.[0]?.fullName || "N/A"}</td>
                    <td>{booking.providerDetails?.[0]?.serviceCategory || "N/A"}</td>
                    <td>{new Date(booking.selectedDate).toLocaleDateString()}</td>
                    <td>{booking.selectedTime}</td>
                    <td>{booking.payment.status === "completed" ? "Completed" : "Pending"}</td>
                    <td>{booking.payment.amount}</td>
                    <td>
                      {booking.createdAt
                        ? new Date(booking.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      {booking.payment.status !== "completed" && (
                        <button className="btn btn-primary">Transfer Payment</button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="text-center">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination d-flex align-items-center justify-content-center">
          <button
            className={`btn btn-primary mx-2`}
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span className="mx-3">{currentPage}</span>
          <button
            className={`btn btn-primary mx-2`}
            disabled={
              currentPage === Math.ceil(filteredBookings.length / bookingsPerPage)
            }
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;