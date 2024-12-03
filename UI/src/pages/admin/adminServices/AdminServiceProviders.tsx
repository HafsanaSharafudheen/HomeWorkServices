import React, { useState, useEffect } from "react";
import "../adminUsers/adminUsers.css";
import SideBar from "../adminDashboard/SideBar";
import axios from "../../../axios/axios";

interface IProvider {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  serviceCategory?: string;
  yearsOfExperience?: number;
  workingHours?: string;
  certifications?: string;
  languages?: string[];
}

const AdminServiceProviders = () => {
  const [providers, setProviders] = useState<IProvider[]>([]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get("/fetchProviders");
        console.log(response.data.providers, "response data");
        setProviders(response.data.providers);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    fetchProviders();
  }, []);

  // Handle editing a provider
  const handleEditProvider = (id: string) => {
    alert(`Edit functionality for provider with ID: ${id}`);
    // Implement edit logic here
  };

  // Handle deleting a provider
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

  return (
      <div className="row">
        <div className="col-md-2">
          <SideBar />
        </div>

        <div className="col-md-10 user-details-container">
          <h2 className="table-title">Service Providers</h2>
          <div className="responsive-table">
            <table className="table table-bordered table-striped">
              <thead className="thead-dark">
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service Category</th>
                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {providers.length > 0 ? (
                  providers.map((provider) => (
                    <tr key={provider._id}>
                      <td>{provider.fullName}</td>
                      <td>{provider.email}</td>
                      <td>{provider.contactNumber || "N/A"}</td>
                      <td>{provider.serviceCategory || "N/A"}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={() => handleEditProvider(provider._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm ml-2"
                          onClick={() => handleDeleteProvider(provider._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center">
                      No providers found.
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

export default AdminServiceProviders;
