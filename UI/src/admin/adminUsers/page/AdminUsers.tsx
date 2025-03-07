import  { useState, useEffect } from "react";
import "./adminUsers.css";
import { FaPhone, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFilter, FaUsers, FaEdit, FaTrash, FaBan, FaCheck } from 'react-icons/fa';
import { User } from "../../../User/types/user";
import axios from "../../../utilities/axios";
import SideBar from "../../adminDashboard/page/sideBar/SideBar";
import defaultImage from'../../../assets//images/DefaultImage.avif'

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
    <div className="dashboardContainer">
        <SideBar />
        



      <div className="mainContent">
      <h2 className="table-title my-4 headingStyle">User Details</h2>

      <div className="container">
  <div className="row g-3 align-items-center mb-3 totalCount">
    
    {/* Total Users - Full Width on Small, Inline on Medium+ */}
    <div className="col-12 col-md-6 d-flex align-items-center">
      <FaUsers className="me-2 text-primary" />
      <h6 className="mb-0">Total Users: {filteredUsers.length}</h6>
    </div>

    {/* Search and Filter - Full Width on Small, Inline on Medium+ */}
    <div className="col-12 col-md-6">
      <div className="row g-2">
        
        {/* Search Input with Floating Label */}
        <div className="col-12 col-md-8">
          <div className="form-floating">
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
        </div>

        {/* Filter Dropdown */}
        <div className="col-12 col-md-4">
          <div className="dropdown">
            <button
              className="btn btn-sm btn-primary dropdown-toggle w-100"
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
                <button className="dropdown-item" onClick={() => setFilterType("alphabetical")}>
                  Alphabetical Order
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => setFilterType("date")}>
                  Date Added
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={() => setFilterType("")}>
                  Clear Filter
                </button>
              </li>
            </ul>
          </div>
        </div>

      </div>
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
    src={
      user.profilePicture
        ? `${import.meta.env.VITE_API_BASEURL}${user.profilePicture}`
        : defaultImage
    }
    alt={user.fullName}
    className="user-image"
  />
  <p>{user.fullName}</p>
</div>

        </td>
        <td>
          <div className="contactIcons">
            <FaPhone className="text-primary"/>
            <p>{user.phone}</p>
          
          <FaWhatsapp className="text-success" />
          <p>{user.whatsappNumber}</p>
          </div>
          <div className="contactIcons">
          <FaEnvelope className="text-warning" />
          <p>{user.email}</p>
          </div>
        </td>
        <td>
          <div className="contactIcons">
          <FaMapMarkerAlt className="text-danger me-2" />

          <p>
              {user.address.city},{user.address.district} ,{user.address.pin}
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