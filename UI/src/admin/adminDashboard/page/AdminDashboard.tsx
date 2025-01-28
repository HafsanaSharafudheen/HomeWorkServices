import React, { useEffect, useState } from "react";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from "../../../utilities/axios";
import { RootState } from "../../../../Redux/store";
import SideBar from "./sideBar/SideBar";

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
      <SideBar />
      <div className="mainContent">
        <div className="row mt-3">
          <div className="col-md-3 dashboardCard me-1">
            <p>
              <FaClipboardList /> Total Bookings
            </p>
            <p>{stats.totalBookings}</p>
          </div>
          <div className="col-md-3 dashboardCard me-1">
            <p>
              <FaUsers /> Total Users
            </p>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="col-md-3 dashboardCard me-1">
            <p>
              <FaBuilding /> Total ServiceMen
            </p>
            <p>{stats.totalServiceProviders}</p>
          </div>
          <div className="col-md-3 dashboardCard me-1">
            <p>
              <FaTools /> Total Categories
            </p>
            <p>{stats.totalCategories}</p>
          </div>
        </div>
  
        <div className="row charts mt-4">
          <div className="col-12 col-sm-4">
            <div className="barChart" style={{ height: "350px" }}>
              <p className="headingStyle2 text-center">Bookings by Date</p>
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
  
          <div className="col-12 col-sm-4">
            <div className="barChart" style={{ height: "350px" }}>
              <p className="headingStyle2 text-center">Bookings by Time</p>
              <Bar
                data={timeData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
  
          <div className="col-12 col-sm-4">
            <div className="pieChart" style={{ height: "350px" }}>
              <p className="headingStyle2 text-center">Payment Status Breakdown</p>
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
};

export default AdminDashboard;
