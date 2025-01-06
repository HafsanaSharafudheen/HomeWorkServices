import  { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  const timeSlots = ["9-11 AM", "11-1 PM", "2-4 PM", "4-6 PM"];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get<{ bookings: Booking[] }>("/fetchAllBookings");
        const bookingsData = response.data.bookings;

        setBookings(bookingsData);
        setFilteredBookings(bookingsData);

        //set for removes duplicate serviceCategory values.
        // A clean array of unique and valid serviceCategory values.example:['Cleaning', 'Plumbing']

        const uniqueCategories = [
          ...new Set(
            bookingsData.map(
              (booking) => booking.providerDetails?.[0]?.serviceCategory
            )
          ),
        ].filter((category) => category);//Filters out invalid or undefined categories.

        setCategories(uniqueCategories as string[]);
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

    // Apply alphabetical order filter
    if (filterType === "alphabetical") {
      filtered.sort((a, b) =>
        (a.userDetails?.[0]?.fullName || "").localeCompare(
          b.userDetails?.[0]?.fullName || ""
        )
      );
    }

    // Sort by date (recent first)
    if (filterType === "recent") {
      filtered.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    // Filter by selected category
    if (selectedCategory) {
      filtered = filtered.filter(
        (booking) =>
          booking.providerDetails?.[0]?.serviceCategory === selectedCategory
      );
    }

    // Filter by time slot
    if (selectedTimeSlot) {
      filtered = filtered.filter((booking) => {
        const [start, end] = selectedTimeSlot
          .split("-")
          .map((time) => parseInt(time.replace(/[^0-9]/g, ""), 10));
        const bookingHour = parseInt(
          booking.selectedTime.split(":")[0],
          10
        );

        return bookingHour >= start && bookingHour < end;
      });
    }

    // Filter by payment status
    if (paymentStatus) {
      filtered = filtered.filter(
        (booking) => booking.payment.status === paymentStatus
      );
    }

    setFilteredBookings(filtered);
  }, [searchTerm, filterType, selectedCategory, selectedTimeSlot, paymentStatus, bookings]);

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
      <div className="col-lg-3 col-md-4 col-sm-12">
        <SideBar />
      </div>

      <div className="col-lg-9 col-md-8 col-sm-12">
        <h2 className="headingStyle my-4">Booking Details</h2>

        <div className="d-flex justify-content-between align-items-center mb-3 totalCount">
          <div className="d-flex align-items-center">
            <FaUsers className="me-2 text-primary" />
            <span>Total Bookings: {filteredBookings.length}</span>
          </div>

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

            <div className="dropdown me-3">
              <button
                className=" btn btn-sm DefaultDropDown dropdown-toggle"
                type="button"
                id="categoryDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </button>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedCategory("")}
                  >
                    Clear Category
                  </button>
                </li>
              </ul>
            </div>

            <div className="dropdown me-3">
              <button
                className="btn-sm btn DefaultDropDown dropdown-toggle"
                type="button"
                id="timeSlotDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Time Slot
              </button>
              <ul className="dropdown-menu" aria-labelledby="timeSlotDropdown">
                {timeSlots.map((slot) => (
                  <li key={slot}>
                    <button
                      className="dropdown-item"
                      onClick={() => setSelectedTimeSlot(slot)}
                    >
                      {slot}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setSelectedTimeSlot("")}
                  >
                    Clear Time Slot
                  </button>
                </li>
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="DefaultDropDown btn-sm btn dropdown-toggle"
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
                    onClick={() => setFilterType("alphabetical")}
                  >
                    Alphabetical Order
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilterType("recent")}
                  >
                    Recent First
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setPaymentStatus("completed")}
                  >
                    Completed Payments
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setPaymentStatus("pending")}
                  >
                    Pending Payments
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      setFilterType("");
                      setPaymentStatus("");
                    }}
                  >
                    Clear Filters
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

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
                        <button className="DefaultButton2">Transfer Payment</button>
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

        <div className="pagination d-flex align-items-center justify-content-center">
          <button
            className={`btn btn-sm btn-primary mx-2`}
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Previous
          </button>
          <span className="mx-3">{currentPage}</span>
          <button
            className={`btn btn-sm btn-primary mx-2`}
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
