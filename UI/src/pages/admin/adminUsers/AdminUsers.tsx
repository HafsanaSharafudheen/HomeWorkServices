import  { useState, useEffect } from "react";
import "./adminUsers.css";
import SideBar from "../adminDashboard/SideBar";
import axios from "../../../utilities/axios";
import { User } from "../../../types/user";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFilter, FaUsers, FaEdit, FaTrash, FaBan, FaCheck } from 'react-icons/fa';

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  const [filterType, setFilterType] = useState(""); 

 
    const fetchUsers = async (page: number,search: string,filter: string) => {
      try {
        const response = await axios.get("/fetchUsers", {
          params: {
            page, search,filter,
            limit: usersPerPage,
           
          },
        });      
          setUsers(response.data.users);
        setTotalUsers(response.data.totalCount);

        setFilteredUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    useEffect(() => {
    fetchUsers(currentPage,searchTerm,filterType);
  }, [currentPage,searchTerm,filterType]);


 

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

 
  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalUsers / usersPerPage)) {
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
  {users.length > 0 ? (
    users.map((user) => (
      <tr key={user._id}>
        <td>
          <div className="userProfile">
            <img
              src={user.image || "https://via.placeholder.com/100"}
              alt={user.fullName}
              className="user-image"
            />
            <p>{user.fullName}</p>
          </div>
        </td>
        <td>
          <div className="contactIcons">
            <FaPhone className="text-primary me-2"/>
            <p>{user.phone}</p>
          </div>
          <div className="contactIcons">
          <FaWhatsapp className="text-success me-2" />
          <p>{user.whatsappNumber}</p>
          </div>
          <div className="contactIcons">
          <FaEnvelope className="text-warning me-2" />
          <p>{user.email}</p>
          </div>
        </td>
        <td>
          <div className="contactIcons">
          <FaMapMarkerAlt className="text-danger me-2" />

          <p>
              {user.address.city}, <br></br>{user.address.district} ,<br></br> {user.address.pin}
            </p>
          </div>
         
        </td>
      


<td>
  {user?.isBlocked ? (
    <button className="btn-unblock"
     
      onClick={() => handleUnblockUser(user._id)}
    >
      <FaCheck/> Unblock
    </button>
  ) : (
    <button
      className="btn-block"
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
            disabled={currentPage >= Math.ceil(totalUsers / usersPerPage)}
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