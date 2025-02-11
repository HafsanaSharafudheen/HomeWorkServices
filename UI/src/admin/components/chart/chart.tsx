import { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import axios from "../../../utilities/axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import './chart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Chart() {
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    bookingsByDate: {
      labels: [],
      data: [],
    },
    paymentStatus: {
      labels: [],
      data: [],
    },
  });

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get("/ServiceProviderDashboardData");
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSearch = async () => {
    if (!dateRange.startDate || !dateRange.endDate) {
      setError("Please select a valid date range.");
      return;
    }

    setLoading(true);
    setError("");

     // Reset previous data to prevent showing old results
  setDashboardData({
    totalBookings: 0,
    bookingsByDate: { labels: [], data: [] },
    paymentStatus: { labels: [], data: [] },
  });
  
    try {
      const response = await axios.get("/dashboardDataWithDate", {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      });
      if (response.status === 200) {
        setDashboardData(response.data);
      }
    } catch (err) {
      setError("Failed to fetch data for the selected date range.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const chartData = {
    labels: dashboardData.bookingsByDate.labels,
    datasets: [
      {
        label: "Bookings",
        data: dashboardData.bookingsByDate.data,
        backgroundColor: [
          "rgba(75, 192, 192, 0.8)", 
          "rgba(255, 99, 132, 0.8)",
          "rgba(255, 205, 86, 0.8)", 
          "rgba(54, 162, 235, 0.8)", 
          "rgba(153, 102, 255, 0.8)", 
          "rgba(201, 203, 207, 0.8)", 
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: "black" },
      },
      title: {
        display: true,
        text: "Bookings Overview by Date",
        color: "black",
      },
    },
  };

  return (
    <div className="dashboard">
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

<div className="row">
  <div className="col-md-5">
  <div className="search-container">
        <input
          type="date"
          value={dateRange.startDate}
          onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
        />
        <input
          type="date"
          value={dateRange.endDate}
          onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
        />
        <button className="DefaultButton" onClick={handleDateSearch}>Search</button>
      </div>
  </div>
  <div className="col-md-7">
{/* Booking Cards */}
<div className="row justify-content-center g-2 mt-3">
        <div className="col-12 col-md-4">
          <div className="providerCard">
            <h6 className="providerCard-title">Total Bookings: {dashboardData.totalBookings}</h6>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="providerCard">
            <h6 className="providerCard-title">Pending: {dashboardData.paymentStatus.data[0] || 0}</h6>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="providerCard">
            <h6 className="providerCard-title">Completed: {dashboardData.paymentStatus.data[1] || 0}</h6>
          </div>
        </div>
      </div>
  </div>
  
  </div>
      

      {/* Chart */}
      <div className="ChartDiagram">
        <Card.Body>
        <div className="chart-container">
  <Bar data={chartData} options={chartOptions} />
</div>
        </Card.Body>
      </div>

      
    </div>
  );
}

export default Chart;
