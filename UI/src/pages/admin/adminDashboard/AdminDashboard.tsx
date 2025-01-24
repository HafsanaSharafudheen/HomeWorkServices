import React, { useEffect, useState } from "react";
import axios from "../../../utilities/axios";
import "./adminDashboard.css";
import {  FaUsers, FaClipboardList, FaBuilding, FaTools } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import SideBar from "./SideBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RootState } from "../../../../Redux/store";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const AdminDashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
const navigate=useNavigate()
  const [timeData, setTimeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bookings by Time",
        data: [],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  });
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalUsers: 0,
    totalServiceProviders: 0,
    totalCategories:0
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [
      {
        label: "Bookings",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  });
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  });
  useEffect(()=>{
if(user===null){
  navigate('/login')
}
  })

  const fetchData = async () => {
    try {
      const response = await axios.get("/adminDashboardData");
      const data = response.data;

      setStats({
        totalBookings: data.totalBookings,
        totalUsers: data.totalUsers,
        totalServiceProviders: data.totalServiceProviders,
        totalCategories:data.totalCategories
      });

      setBarData({
        labels: data.bookingsByDate.labels,
        datasets: [
          {
            label: "Bookings by Date",
            data: data.bookingsByDate.data,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      });

      setTimeData({
        labels: data.bookingsByTime.labels,
        datasets: [
          {
            label: "Bookings by Time",
            data: data.bookingsByTime.data,
            backgroundColor: "rgba(153, 102, 255, 0.6)",
          },
        ],
      });

      setPieData({
        labels: data.paymentStatus.labels,
        datasets: [
          {
            data: data.paymentStatus.data,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  

  return (
    <div className="dashboardContainer">
      <div className="row">
        <div className="col-md-3">
          <SideBar />
        </div>
        <div className="col-md-9 mainContent mt-4">
          <div className="header d-flex justify-content-between align-items-center">
            <h1 className="headingStyle mb-3">Admin Dashboard</h1>
           
          </div>

          <div className="row statsCards">
            <div className="col-md-3 card me-2">
              <p><FaClipboardList /> Total Bookings</p>
              <h3>{stats.totalBookings}</h3>
            </div>
            <div className="col-md-3 card me-2">
              <p><FaUsers /> Total Users</p>
              <h3>{stats.totalUsers}</h3>
            </div>
            <div className="col-md-3 card me-2">
              <p><FaBuilding /> Total ServiceMen</p>
              <h3>{stats.totalServiceProviders}</h3>
            </div>
            <div className="col-md-3 card me-2">
              <p> <FaTools /> Total Categories</p>
              <h3>{stats.totalCategories}</h3>
            </div>
          </div>

          <div className="row charts mt-5">
            <div className="col-md-6 barChart" style={{ height: "300px" }}>
              <h3>Bookings by Date</h3>
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            <div className="col-md-6 barChart" style={{ height: "300px" }}>
              <h3>Bookings by Time</h3>
              <Bar data={timeData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            <div className="col-md-12 mt-5 pieChart" style={{ height: "300px" }}>
              <h3>Payment Status Breakdown</h3>
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
