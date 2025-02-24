import { useEffect, useState } from 'react';
import ServiceNavbar from '../ServiceNavbar';
import axios from '../../utilities/axios';
import { Booking } from '../../booking/types/booking';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaFilter, FaTimes } from 'react-icons/fa';
import './ProviderBookings.css';
import ProviderSidebar from '../Sidebar/Sidebar';
import UpdateWorkProgress from './UpdateWorkProgress';

function ProviderBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [filter, setFilter] = useState('all');
    const [showCalendar, setShowCalendar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('')

    const [photos, setPhotos] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);


    const Provider = useSelector((state: RootState) => state.user.user);
    const providerId = Provider?.id;
    const handleOpenModal = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setShowModal(true);
      };
      
      const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBookingId(null);
      };
      
    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/fetchProviderBookings`, {
                params: { providerId },
            });
            setBookings(response.data.bookings);
        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };

    const handleStatusUpdate = async (bookingId, status) => {
        
        try {
            await axios.patch(`/updateBookingStatus`, { bookingId, status });
            await fetchBookings();
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const handleWorkUpdate = async (e, bookingId) => {
        e.preventDefault(); // Prevent default form submission
    
        const formData = new FormData();
    
        // Append photos and videos to FormData
        photos.forEach((photo) => formData.append('photos', photo));
        videos.forEach((video) => formData.append('videos', video));
    
        // Append other data
        formData.append('title', title); // Assuming `title` is managed as state
        formData.append('description', description); // Assuming `description` is managed as state
        formData.append('bookingId', bookingId);
    
        try {
            // Send form data to the backend
            await axios.post(`/updateWorkDetails`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            await fetchBookings(); 
            setShowModal(false); 
        } catch (error) {
            console.error('Error updating work details:', error);
        }
    };
    
    const applyFilter = () => {
        let filtered = bookings;
        if (filter !== 'all') {
            filtered = bookings.filter((booking) => booking.status === filter);
        }
        setFilteredBookings(filtered);
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: 'photos' | 'videos'
    ) => {
        if (event.target.files) {
            const selectedFiles = Array.from(event.target.files);
            if (type === 'photos') {
                const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
                setPhotos((prev) => [...prev, ...selectedFiles]);
                setPhotoPreviews((prev) => [...prev, ...newPreviews]);
            } else if (type === 'videos') {
                const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
                setVideos((prev) => [...prev, ...selectedFiles]);
                setVideoPreviews((prev) => [...prev, ...newPreviews]);
            }
        }
    };

    const handleFileRemove = (index: number, type: 'photos' | 'videos') => {
        if (type === 'photos') {
            const updatedPhotos = [...photos];
            const updatedPreviews = [...photoPreviews];
            updatedPhotos.splice(index, 1);
            updatedPreviews.splice(index, 1);
            setPhotos(updatedPhotos);
            setPhotoPreviews(updatedPreviews);
        } else if (type === 'videos') {
            const updatedVideos = [...videos];
            const updatedPreviews = [...videoPreviews];
            updatedVideos.splice(index, 1);
            updatedPreviews.splice(index, 1);
            setVideos(updatedVideos);
            setVideoPreviews(updatedPreviews);
        }
    };
    useEffect(() => {
        if (providerId) fetchBookings();
    }, [providerId]);

    useEffect(() => {
        applyFilter();
    }, [bookings, filter]);

    return (
        <div>
         {showModal  &&  selectedBookingId!= null &&(
            <UpdateWorkProgress
                bookingId={selectedBookingId}
                onClose={handleCloseModal}
                fetchBookings={fetchBookings}
            />
        )}
        <div>
        <ServiceNavbar />

      
        <div className="d-flex h-screen bg-gray-100">

      
       <ProviderSidebar />
            <div className="w-100 p-6 bg-white flex-1">
<div className="row">

                <div className="col-md-4 p-4">
                <button
  className="btn btn-warning mb-3"
  onClick={() => setShowCalendar(!showCalendar)}
>
  Show Calendar
</button>
                </div>
             
{showCalendar && (
  <Calendar
    onChange={(date) => setSelectedDate(date)}
    value={selectedDate}
    tileClassName={({ date }) => {
      const bookingsOnDate = bookings.filter(
        (b) =>
          new Date(b.selectedDate).toDateString() === date.toDateString()
      );
      return bookingsOnDate.length > 0 ? "booked-slot" : "";
    }}
    tileContent={({ date }) => {
      const bookingsOnDate = bookings.filter(
        (b) =>
          new Date(b.selectedDate).toDateString() === date.toDateString()
      );
      return bookingsOnDate.length > 0 ? (
        <div className="badge-wrapper">
          <p className="booking-count">{bookingsOnDate.length}Bookings</p>
        </div>
      ) : null;
    }}
  />
)}


<div className="col-md-6">


<div className="filter-container">
                            {["All", "Pending", "Accepted", "Rejected", "Completed"].map((status) => (
                                <div
                                    key={status}
                                    className={`filter-card ${filter === status.toLowerCase() ? "active" : ""}`}
                                    onClick={() => setFilter(status.toLowerCase())}
                                >
                                    
                                    {status}
                                </div>
                            ))}
                        </div>

</div>

</div>



                    {filteredBookings.length > 0 ? (
                        <ul className="list-group">
                            {filteredBookings.map((booking) => (
                                <li
                                    key={booking._id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h5>{booking.userDetails[0]?.fullName}</h5>
                                        <p>
                                            {booking.userDetails[0]?.address.city},
                                            {booking.userDetails[0]?.address.district}
                                        </p>
                                        <p>
                                            Date: {new Date(booking.selectedDate).toLocaleDateString()}
                                        </p>
                                        <p>Time: {booking.selectedTime}</p>

                                        {booking.workingUpdates && booking.workingUpdates.length > 0 && (
  <div className="working-updates row">
    {booking.workingUpdates.map((update, index) => (
      <div key={index} className="col-md-4 mb-3">
        <div className="working-update-card p-2">
          {/* Title and Description */}
          <h6>{update.title}</h6>
          <p>{update.description}</p>

          {/* Date */}
          <p className="update-time">
           {new Date(update.time).toLocaleString()}
          </p>

          {/* Photos */}
          {update.photos && update.photos.length > 0 && (
            <div className="update-photos">
              {update.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={`${import.meta.env.VITE_API_BASEURL}/${photo}`}
                  alt={`Update Photo ${idx + 1}`}
                  className="update-image"
                />
              ))}
            </div>
          )}

          {/* Videos */}
          {update.videos && update.videos.length > 0 && (
            <div className="update-videos">
              {update.videos.map((video, idx) => (
                <video
                  key={idx}
                  src={video}
                  controls autoPlay
                  className="update-video"
                >
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
)}


                                    </div>
                                    
                                    <div className="row">
                                        {booking.status === 'pending' && (
                                            <>
                                                <button
                                                    className="btn btn-success me-2"
                                                    onClick={() =>
                                                        handleStatusUpdate(booking._id, 'accepted')
                                                    }
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        handleStatusUpdate(booking._id, 'rejected')
                                                    }
                                                >
                                                    Reject
                                                </button>
                                            </>
                                        )}
                                        {booking.status === 'accepted' && (
    <>
       

        <button
            className="btn btn-primary me-2"
            onClick={() => handleOpenModal(booking._id)}
        >
            Update Work Progress
        </button>

        <button
            className="btn btn-success"
            onClick={() => handleStatusUpdate(booking._id, 'completed')}
        >
            Mark as Completed
        </button>
    </>
)}

 {booking.status === "completed" && (
            <div>
              <h6 className="text-success fw-bold">Completed</h6>

              {/* Payment Credit Details */}
              {booking.payment?.releasedDate ? (
                <div className="payment-details mt-2">
                  <p className='text-danger'>
                    Amount Credited: ₹{booking.payment.amount}
                  </p>
                  <p>
                    Credited on:{" "}
                    {new Date(
                      booking.payment.releasedDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="payment-details mt-2">
                  <p>
                    Amount:₹{booking.payment?.amount}
                  </p>
                  <p className='text-warning'>
  <strong>Payment will be credited on:</strong>{" "}
  {booking.payment?.time
    ? new Date(
        new Date(booking.payment.time).getTime() + 
        3 * 24 * 60 * 60 * 1000
      ).toLocaleDateString()
    : "Pending Release"}
</p>

                </div>
              )}
            </div>
          )}

                                        {booking.status === 'rejected' && (
                                            <h6 className="text-danger fw-bold">Rejected</h6>
                                        )}
                                         {booking.status === 'cancelled' && (
                                            <h6 className="text-danger fw-bold">Cancelled</h6>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings available.</p>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default ProviderBookings;
