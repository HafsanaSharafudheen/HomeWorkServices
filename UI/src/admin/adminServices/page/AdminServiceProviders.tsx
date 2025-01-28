import  { useState, useEffect } from "react";
import SideBar from "../../adminDashboard/page/sideBar/SideBar.tsx";
import axios from "../../../utilities/axios.ts";
import { Provider } from "../../../ServiceProvider/types/provider.ts";
import {  FaFilter, FaUsers, FaStar, FaClock, FaMapMarkerAlt, FaLanguage, FaBriefcase, FaMoneyBillWave, FaWrench, FaPhone, FaEnvelope } from "react-icons/fa";
import "./AdminServiceProvider.css";
import { useServiceProviders } from "../hooks/useServiceProviders.ts.tsx";
import { useProviderReviews } from "../hooks/useProviderReviews .tsx";
import { Review } from "../../../Reviews/types/review.ts";
import defaultImage from '../../../assets/images/DefaultImage.avif'


const AdminServiceProviders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const { providers, updateProvider } = useServiceProviders();
  const { fetchReviews } = useProviderReviews(); // Hook to fetch reviews
  const [showModal, setShowModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Filter logic
  useEffect(() => {
    let filtered = [...providers];
    if (searchTerm) {
      filtered = filtered.filter(
        (provider) =>
          provider.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (provider.serviceCategory &&
            provider.serviceCategory.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterType === "category") {
      filtered = filtered.filter((provider) => provider.serviceCategory);
    } else if (filterType === "clear") {
      setSearchTerm("");
      setFilterType("");
    }

    setFilteredProviders(filtered);
  }, [searchTerm, filterType, providers]);

  // Pagination logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredProviders.slice(indexOfFirstRow, indexOfLastRow);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProviders.length / rowsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleBlockUser = async (id: string) => {
    try {
      const response = await axios.patch(`/blockProvider/${id}`);
      updateProvider(response.data.provider);
    } catch (error) {
      console.error("Error blocking provider:", error);
    }
  };

  const handleUnblockUser = async (id: string) => {
    try {
      const response = await axios.patch(`/unblockProvider/${id}`);
      updateProvider(response.data.provider);
    } catch (error) {
      console.error("Error unblocking provider:", error);
    }
  };

  const handleViewDetails = async (provider: Provider) => {
    setSelectedProvider(provider);
    try {
      const reviewsData = await fetchReviews(provider._id);
      setReviews(reviewsData);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
    setShowModal(true);
  };

  return (
    <div className="dashboardContainer">
        <SideBar />
        



      <div className="mainContent">
        <h2 className="table-title my-4 headingStyle">Service Providers Details</h2>
        {/* Top Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3 totalCount">
          <div className="d-flex align-items-center">
            <FaUsers className="me-2 text-primary" />
            <h6>Total Providers: {filteredProviders.length}</h6>
          </div>
          {/* Search and Filter */}
          <div className="d-flex align-items-center">
            <div className="form-floating me-3">
              <input
                type="text"
                id="searchInput"
                placeholder="Search by name or category"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <label htmlFor="searchInput">Search</label>
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
                    onClick={() => setFilterType("category")}
                  >
                    Category Based
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => setFilterType("clear")}
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
          <table className="providersTable table">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service Category</th>
                <th>Service Charge</th>
                <th>Address</th>
                <th>Actions</th>
                <th>View Details</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((provider) => (
                  <tr key={provider._id}>
                  <td>
  <div style={{ textAlign: "center" }}>
    <img
      src={
        provider.profilePicture
          ? `${import.meta.env.VITE_API_BASEURL}${provider.profilePicture}`
          : defaultImage
      }
      alt={provider.fullName}
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        objectFit: "cover",
        display: "block",
        margin: "0 auto",
      }}
    />
    <p>
      {provider.fullName}
    </p>
  </div>
</td>


                    <td>{provider.email}</td>
                    <td><p>{provider.contactNumber || "N/A"}</p><p>{provider.whatsappNumber}</p></td>
                    <td>{provider.serviceCategory || "N/A"}</td>
                    <td>{provider.serviceCharge || "N/A"}</td>
                    <td>
                      {provider.address?.city || "N/A"},{" "}
                      {provider.address?.district || "N/A"}, PIN:{" "}
                      {provider.address?.pin || "N/A"}
                    </td>
                   
                      <td>
                      {provider.isBlocked ? (
                        <button
                          className="btn-unblock"
                          onClick={() => provider._id && handleUnblockUser(provider._id)}
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          className="btn-block"
                          onClick={() => provider._id && handleBlockUser(provider._id)}
                        >
                          Block
                        </button>
                      )}
                    </td>
                    <td>

                  
                    <a
    href="#"
    className="text-primary"
    onClick={(e) => {
      e.preventDefault();
      handleViewDetails(provider);
    }}
  >
    View Details
  </a>
  </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center noProviders">
                    No providers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
              currentPage === Math.ceil(filteredProviders.length / rowsPerPage)
            }
            onClick={handleNextPage}
          >
            Next
          </button>
        </div>
      </div>

     {/* Modal for Provider Details */}
{showModal && selectedProvider && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="headingStyle">{selectedProvider.fullName} - Details</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>
        <div className="modal-body">
          {/* Provider Details */}
          <div>
  {/* Email */}
  <p>
    <FaEnvelope className="icon" /> {selectedProvider.email}
  </p>

  {/* Contact Number */}
  <p>
    <FaPhone className="icon" /> {selectedProvider.contactNumber}
  </p>

  {/* Service Category */}
  <p>
    <FaWrench className="icon" /> {selectedProvider.serviceCategory}
  </p>

  {/* Service Charge */}
  <p>
    <FaMoneyBillWave className="icon" /> {selectedProvider.serviceCharge} service charge
  </p>

  {/* Years of Experience */}
  <p>
    <FaBriefcase className="icon" /> {selectedProvider.yearsOfExperience} years of experience
  </p>

  {/* Languages */}
  <p>
    <FaLanguage className="icon" /> {selectedProvider.languages?.join(", ")}
  </p>

  {/* Availability */}
  <p
    style={{
      color: selectedProvider.isAvailable ? "green" : "red",
      fontWeight: "bold",
    }}
  >
    <FaClock className="icon" /> {selectedProvider.isAvailable ? "Available" : "Not Available"}
  </p>

  {/* Address */}
  <p>
    <FaMapMarkerAlt className="icon" /> {selectedProvider.address?.city}, 
    {selectedProvider.address?.district}, PIN: {selectedProvider.address?.pin}
  </p>

  
</div>

          {/* Reviews */}
          <h6 className="headingStyle">Reviews:</h6>
          {reviews.length > 0 ? (
            <div>
              {reviews.map((review) => (
                <div key={review._id} className="mb-3 border p-3 rounded">
                  {/* Reviewer Details */}
                  <h6 className="mb-1">Review From</h6>
                  <p>
                    <strong>{review.userDetails.fullName}</strong> ({review.userDetails.email})<br />
             {review.userDetails.phone}<br />
                  {review.userDetails.address.city}, {review.userDetails.address.district}, PIN: {review.userDetails.address.pin}
                  </p>

                 {/* Review Details */}
<h6 className="mb-1">Review:</h6>
<div className="mb-2">
  {Array.from({ length: 5 }, (_, index) => (
    <span key={index}>
      {index < review.ratings ? (
        <FaStar color="gold" /> // Filled star for ratings
      ) : (
        <FaStar color="lightgray" /> // Empty star for remaining
      )}
    </span>
  ))}
</div>
<p>Message: {review.message}</p>

                  {/* Work Images */}
                  {review.workImage.length > 0 && (
                    <div>
                      <h6 className="mb-1">Work Images:</h6>
                      <div className="d-flex">
                        {review.workImage.map((image, index) => (
                           <img
                           key={index}
                           src={`${import.meta.env.VITE_API_BASEURL}/${image}`} // Dynamically construct the image URL
                           alt="Work"
                           style={{ width: "50px", height: "50px", marginRight: "10px" }}
                         />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
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

export default AdminServiceProviders;
