import { useState, useEffect } from "react";
import { Card,  Form } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import axios from "../../utilities/axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import './chart.css'

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
        labels: {
          color: "black", 
        },
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

      <div className="row mb-5">
  {/* Total Bookings Card */}
  <div className="col-md-4">
    <div className="card smallCardStyle">
      <div className="card-body text-center">
        <h6 className="card-title">Total Bookings</h6>
        <h3 className="card-text">{dashboardData.totalBookings}</h3>
      </div>
    </div>
  </div>

  {/* Pending Bookings Card */}
  <div className="col-md-4">
    <div className="card smallCardStyle">
      <div className="card-body text-center">
        <h6 className="card-title">Pending</h6>
        <h3 className="card-text">{dashboardData.paymentStatus.data[0]||0}</h3>
      </div>
    </div>
  </div>

  {/* Completed Bookings Card */}
  <div className="col-md-4">
    <div className="card smallCardStyle">
      <div className="card-body text-center">
        <h6 className="card-title">Completed</h6>
        <h3 className="card-text">{dashboardData.paymentStatus.data[1]||0}</h3>
      </div>
    </div>
  </div>
</div>

<Form>
  <div className="row align-items-end mb-5">
    {/* Start Date */}
    <div className="col-md-3">
      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          value={dateRange.startDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, startDate: e.target.value })
          }
        />
      </Form.Group>
    </div>

    <div className="col-md-3">
      <Form.Group>
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          value={dateRange.endDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, endDate: e.target.value })
          }
        />
      </Form.Group>
    </div>

    <div className="col-md-3">
  <button
    onClick={handleDateSearch}
    className="btn btn-primary d-flex align-items-center justify-content-center"
  >
    Search
  </button>
</div>

  </div>
</Form>

      {/* Chart */}
     <div className="ChartDiagram">
     <Card.Body style={{ backgroundColor: "white"}}>
    <Bar data={chartData} options={chartOptions} />
  </Card.Body>
     </div>
 

    </div>
  );
}

export default Chart;
