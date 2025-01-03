import React, { useState, useEffect } from "react";
import "./adminUsers.css";
import SideBar from "../adminDashboard/SideBar";
import axios from "../../../axios/axios";
import { User } from "../../../types/user";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFilter, FaUsers, FaEdit, FaTrash, FaBan, FaCheck } from 'react-icons/fa';

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [filterType, setFilterType] = useState(""); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/fetchUsers");
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting based on filterType
    if (filterType === "alphabetical") {
      filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));
    } else if (filterType === "date") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredUsers(filtered);
  }, [searchTerm, filterType, users]);

  const handleBlockUser = async (id) => {
    try {
      const response = await axios.patch(`/block/${id}`);
      const updatedUser = response.data.user;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };
  
  const handleUnblockUser = async (id) => {
    try {
      const response = await axios.patch(`/unblock/${id}`);
      const updatedUser = response.data.user;
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === id ? updatedUser : user))
      );
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };
  

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="row admin-users-container">
      {/* Sidebar */}
      <div className="col-lg-3 col-md-4 col-sm-12">
        <SideBar />
      </div>

      {/* Main Content */}
      <div className="col-lg-9 col-md-8 col-sm-12">
      <h2 className="table-title my-4">User Details</h2>

      <div className="d-flex justify-content-between align-items-center mb-3 totalCount">
      <div className="d-flex align-items-center">
      <FaUsers className="me-2 text-primary" />
    <span>Total Users: {filteredUsers.length}</span>
  </div>
  <div className="d-flex align-items-center">

  <div className="form-floating me-2">
    <input
      type="text"
      id="searchInput"
      placeholder="Search by name"
      className="form-control"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <label htmlFor="searchInput">Search by name</label>
 
  </div>
  <div className="dropdown mt-2">
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
          onClick={() => setFilterType("alphabetical")}
        >
          Alphabetical Order
        </button>
      </li>
      <li>
        <button
          className="dropdown-item"
          onClick={() => setFilterType("date")}
        >
          Date Added
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
          <table className="userstable table">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {currentUsers.length > 0 ? (
    currentUsers.map((user) => (
      <tr key={user._id}>
        <td>
          <div className="userProfile">
            <img
              src={user.image || "https://via.placeholder.com/100"}
              alt={user.fullName}
              className="user-image"
            />
            <span>{user.fullName}</span>
          </div>
        </td>
        <td>
          <div className="contact-icons">
            <FaPhone className="text-primary me-2"/>
            <span>{user.phone}</span>
          </div>
          <div className="contact-icons">
          <FaWhatsapp className="text-success me-2" />
          <span>{user.whatsappNumber}</span>
          </div>
          <div className="contact-icons">
          <FaEnvelope className="text-warning me-2" />
          <span>{user.email}</span>
          </div>
        </td>
        <td>
          <div className="contact-icons">
          <FaMapMarkerAlt className="text-danger me-2" />

          <span>
              {user.address.city}, {user.address.district}
            </span>
          </div>
          <p>PIN: {user.address.pin}</p>
        </td>

<td>
  {user?.isBlocked ? (
    <button className="btn btn-unblock"
     
      onClick={() => handleUnblockUser(user._id)}
    >
      <FaCheck/> Unblock
    </button>
  ) : (
    <button
      className="btn btn-block"
      onClick={() => handleBlockUser(user._id)}
    >
      <FaBan /> Block
    </button>
  )}
</td>

      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={4} className="text-center">
        No users found.
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
              currentPage === Math.ceil(filteredUsers.length / usersPerPage)
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

export default AdminUsers;
