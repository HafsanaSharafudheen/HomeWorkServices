import React, { useState, useEffect } from "react";
import SideBar from "../adminDashboard/SideBar";
import axios from "../../../axios/axios";
import { Provider } from "../../../types/provider";
import { FaEdit, FaTrash } from 'react-icons/fa';
import './AdminServiceProvider.css'
const AdminServiceProviders = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

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

  return (
      <div className="row">
         <div className="col-lg-3 col-md-4 col-sm-12">
        <SideBar />
      </div>

        <div className="col-md-10 providerContainer">
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
                                             className="btn btn-edit"
                                             onClick={() => handleEditUser(user._id)}
                                           >
                                             <FaEdit />
                                           </button>
                                           <button
                                             className="btn btn-delete"
                                             onClick={() => handleDeleteUser(user._id)}
                                           >
                                             <FaTrash />
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
