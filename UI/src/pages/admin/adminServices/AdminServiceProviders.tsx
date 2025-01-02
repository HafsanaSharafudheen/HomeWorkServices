import React, { useState, useEffect } from "react";
import SideBar from "../adminDashboard/SideBar";
import axios from "../../../axios/axios";
import { Provider } from "../../../types/provider";
import { FaEdit, FaTrash, FaFilter, FaUsers } from "react-icons/fa";
import "./AdminServiceProvider.css";

const AdminServiceProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProviders, setFilteredProviders] = useState<Provider[]>([]);
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; 
  // Fetch providers on component mount
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("/fetchProviders");
        setProviders(response.data.providers);
        setFilteredProviders(response.data.providers);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  // Filter logic
  useEffect(() => {
    let filtered = [...providers];

    // Search by name or category
    if (searchTerm) {
      filtered = filtered.filter(
        (provider) =>
          provider.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (provider.serviceCategory &&
            provider.serviceCategory
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Additional filters
    if (filterType === "category") {
      filtered = filtered.filter((provider) => provider.serviceCategory);
    } else if (filterType === "clear") {
      setSearchTerm("");
      setFilterType("");
    }

    setFilteredProviders(filtered);
  }, [searchTerm, filterType, providers]);

  // Actions
  const handleEditProvider = (id: string) => {
    alert(`Edit functionality for provider with ID: ${id}`);
  };

  const handleDeleteProvider = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this provider?")) {
      try {
        await axios.delete(`/api/providers/${id}`);
        setProviders(providers.filter((provider) => provider._id !== id));
      } catch (error) {
        console.error("Error deleting provider:", error);
      }
    }
  };
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


  return (
    <div className="row">
      <div className="col-lg-3 col-md-4 col-sm-12">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="col-lg-9 col-md-8 col-sm-12">
        <h2 className="table-title my-4">Service Providers Details</h2>

        {/* Top Controls */}
        <div className="d-flex justify-content-between align-items-center mb-3 totalCount">
          {/* Total Providers */}
          <div className="d-flex align-items-center">
            <FaUsers className="me-2 text-primary" />
            <span>Total Providers: {filteredProviders.length}</span>
          </div>

          {/* Search and Filter */}
          <div className="d-flex align-items-center">
            {/* Search */}
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
        <div className="responsive-table">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service Category</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((provider) => (
                  <tr key={provider._id}>
                    <td>{provider.fullName}</td>
                    <td>{provider.email}</td>
                    <td>{provider.contactNumber || "N/A"}</td>
                    <td>{provider.serviceCategory || "N/A"}</td>
                    <td>
                      {provider.address.city || "N/A"},{" "}
                      {provider.address.district || "N/A"}, PIN:{" "}
                      {provider.address.pin || "N/A"}
                    </td>
                    <td>
                      <button
                        className="btn btn-edit me-2"
                        onClick={() => handleEditProvider(provider._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDeleteProvider(provider._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
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
              currentPage === Math.ceil(filteredProviders.length / rowsPerPage)
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

export default AdminServiceProviders;