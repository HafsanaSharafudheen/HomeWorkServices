import React, { useState, useEffect } from "react";
import "./adminUsers.css";
import SideBar from "../adminDashboard/SideBar";
import axios from "../../../axios/axios";

interface IUser {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  image: string; 
  createdAt: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/fetchUsers");
        console.log(response.data, "response data");
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (id: string) => {
    alert(`Edit functionality for user with ID: ${id}`);
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2">
          <SideBar />
        </div>

        {/* User Table */}
        <div className="col-md-10 user-details-container">
          <h2 className="table-title">User Details</h2>
          <div className="responsive-table">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Image</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <img
                          src={user.image}
                          alt={user.fullName}
                          className="user-image"
                        />
                      </td>
                      <td>{user.fullName}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEditUser(user._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ml-2"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
};

export default AdminUsers;
