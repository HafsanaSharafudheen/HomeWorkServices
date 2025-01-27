import { useEffect, useState } from 'react';
import ServiceNavbar from '../ServiceNavbar';
import ServiceSidebar from '../ServiceSidebar';
import axios from '../../utilities/axios';
import { Booking } from '../../booking/types/booking';
import { useSelector } from 'react-redux';
import { RootState } from '../../../Redux/store';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaTimes } from 'react-icons/fa';
import './ProviderBookings.css';

function ProviderBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
    const [filter, setFilter] = useState('all');
    const [showCalendar, setShowCalendar] = useState(false);
    const [showModal, setShowModal] = useState(false);
  const [title,setTitle]=useState('');
  const [description,setDescription]=useState('')

    const [photos, setPhotos] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
    const [videoPreviews, setVideoPreviews] = useState<string[]>([]);


    const Provider = useSelector((state: RootState) => state.user.user);
    const providerId = Provider?.id;

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
    
            await fetchBookings(); // Refresh bookings list
            setShowModal(false); // Close the modal
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
            <ServiceNavbar />
            <div className="row">
                <div className="col-md-3">
                    <ServiceSidebar />
                </div>
                <div className="col-md-9">
                    <button
                        className="btn btn-primary mb-3"
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        Show Calendar
                    </button>
                    {showCalendar && (
                        <Calendar
                            onChange={(date) => setSelectedDate(date)}
                            value={selectedDate}
                            tileClassName={({ date }) => {
                                const bookingsOnDate = bookings.filter(
                                    (b) =>
                                        new Date(b.selectedDate).toDateString() ===
                                        date.toDateString()
                                );
                                return bookingsOnDate.length > 0 ? 'booked-slot' : '';
                            }}
                            tileContent={({ date }) => {
                                const bookingsOnDate = bookings.filter(
                                    (b) =>
                                        new Date(b.selectedDate).toDateString() ===
                                        date.toDateString()
                                );
                                return bookingsOnDate.length > 0 ? (
                                    <div className="badge-wrapper">
                                        <span className="booking-count">
                                            {bookingsOnDate.length} Bookings
                                        </span>
                                    </div>
                                ) : null;
                            }}
                        />
                    )}

                    <select
                        className="form-select mb-3"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                    </select>

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
    <div className="working-updates">
        {booking.workingUpdates.map((update, index) => (
            <div key={index} className="working-update-card p-2">
                {/* Title and Description */}
                <h6>{update.title}</h6>
                <p>{update.description}</p>

                {/* Date */}
                <p className="update-time">
                    Updated on: {new Date(update.time).toLocaleString()}
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
        ))}
    </div>
)}

                                    </div>
                                    <div>
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
                                                    onClick={() => setShowModal(true)}
                                                >
                                                    Update Work Progress
                                                </button>
                                                {showModal && (
                                                    <div className="modal-UpdateBooking p-4">
                                                        <div className="modalUpdation-container p-4">
                                                            <div className="modal-header mb-3">
                                                                <h5 className="modal-title">Update Work Progress</h5>
                                                                <button
                                                                    type="button"
                                                                    className="btn-close"
                                                                    onClick={() => setShowModal(false)}
                                                                ></button>
                                                            </div>
                                                            <div className="modal-body">
                                                            <form
    onSubmit={(e) => {
        handleWorkUpdate(e, booking._id);

        // Clear photos, videos, and previews after submission
        setPhotos([]);
        setVideos([]);
        setPhotoPreviews([]);
        setVideoPreviews([]);
    }}
>
    <div className="mb-3">
        <label htmlFor="title" className="form-label">Work Title</label>
        <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            onChange={(e) => setTitle(e.target.value)}  
                       required
        />
    </div>
    <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
            name="description"
            className="form-control"
            id="description"
            rows="3"
            onChange={(e) => setDescription(e.target.value)} 
            required
        ></textarea>
    </div>
    <div className="file-upload-container">
        <div className="row">
            <div className="col-md-6">
                <div className="mb-3">
                    <label className="upload-label">
                        <div className="upload-box">
                            <p>Click to Upload Photos</p>
                        </div>
                        <input
                            type="file"
                            multiple
                            className="upload-input"
                            onChange={(e) => handleFileChange(e, 'photos')}
                        />
                    </label>
                    <div className="file-preview-container">
                        {photoPreviews.map((preview, index) => (
                            <div key={`photo-${index}`} className="file-preview">
                                <img
                                    src={preview}
                                    alt={`Photo Preview ${index + 1}`}
                                    className="preview-image"
                                />
                                <button
                                    type="button"
                                    className="remove-button"
                                    onClick={() => handleFileRemove(index, 'photos')}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="mb-3">
                    <label className="upload-label">
                        <div className="upload-box">
                            <p>Click to Upload Videos</p>
                        </div>
                        <input
                            type="file"
                            multiple
                            className="upload-input"
                            onChange={(e) => handleFileChange(e, 'videos')}
                        />
                    </label>
                    <div className="file-preview-container">
                        {videoPreviews.map((preview, index) => (
                            <div key={`video-${index}`} className="file-preview">
                                <video
                                    src={preview}
                                    controls
                                    className="preview-image"
                                >
                                    Your browser does not support the video tag.
                                </video>
                                <button
                                    type="button"
                                    className="remove-button"
                                    onClick={() => handleFileRemove(index, 'videos')}
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <button type="submit" className="btn btn-primary">
        Save Changes
    </button>
</form>

                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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
                    {new Date(
                      new Date(booking?.payment?.time).getTime() +
                        3 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
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
    );
}

export default ProviderBookings;
