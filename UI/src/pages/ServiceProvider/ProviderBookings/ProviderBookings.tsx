import { useEffect, useState } from 'react';
import ServiceNavbar from '../ServiceNavbar';
import ServiceSidebar from '../ServiceSidebar';
import axios from '../../../axios/axios';
import { Booking } from '../../../types/booking';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store';

function ProviderBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
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

    const handleStatusUpdate = async (bookingId: string) => {
        try {
            await axios.patch(`/updateBookingStatus`, { bookingId });
            await fetchBookings();
        } catch (error) {
            console.error('Error updating booking status:', error);
        }
    };

    const handleUpload = async (bookingId: string, file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`/uploadBookingImage`, formData, {
                params: { bookingId },
            });
            setBookings((prev) =>
                prev.map((booking) =>
                    booking._id === bookingId
                        ? { ...booking, uploadedImage: response.data.imageUrl }
                        : booking
                )
            );
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    useEffect(() => {
        if (providerId) {
            fetchBookings();
        }
    }, [providerId]);

    return (
        <div>
            <ServiceNavbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <ServiceSidebar />
                    </div>
                    <div className="col-md-9">
                        {bookings.length > 0 ? (
                            <div className="provider-details">
                               
                                <div className="card-body">
                                    <ul className="list-group">
                                        {bookings.map((booking) => (
                                            <li
                                                key={booking._id}
                                                className={`list-group-item ${
                                                    booking.status === 'rejected' ? 'list-group-item-danger' : ''
                                                }`}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                
                                                    <div>
                                                        <p>{booking?.userDetails?.[0]?.fullName}</p>
                                                        <p>
                                                       
                                                            {booking?.userDetails?.[0]?.address.city},{' '}
                                                            {booking?.userDetails?.[0]?.address.district}
                                                            ,{' '}{booking?.userDetails?.[0]?.address.pin}

                                                        </p>
                                                        <p>
                                                      {booking.selectedTime}
                                                        </p>
                                                        <p>
                                                        {new Date(booking.selectedDate).toLocaleDateString()}
                                                        </p>
                                                        <p>
    {booking.status === 'completed' ? (
        <p className="badge bg-success text-white" style={{ fontSize: '9px' }}>
            Completed
        </p>
    ) : booking.status === 'rejected' ? (
        <p className="badge bg-danger text-white" style={{ fontSize: '8px' }}>
            Rejected
        </p>
    ) : (
        <p className="badge bg-warning text-dark" style={{ fontSize: '8px' }}>
            Pending
        </p>
    )}
</p>

                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="text-end">
                                                        {booking.status === 'pending' && (
                                                          <>
                                                          <button
                                                              className="btn btn-success btn-sm mb-1"
                                                              style={{
                                                                  fontSize: '8px', 
                                                                  padding: '4px 8px', 
                                                              }}
                                                              onClick={() => handleStatusUpdate(booking._id)}
                                                          >
                                                              Mark as Completed
                                                          </button>
                                                          <button
                                                              className="btn btn-danger btn-sm mb-1 ms-2"
                                                              style={{
                                                                  fontSize: '8px',
                                                                  padding: '4px 8px', 
                                                              }}
                                                          >
                                                              Reject
                                                          </button>
                                                      </>
                                                      
                                                        )}
                                                        {booking.status === 'completed' && !booking.uploadedImage && (
                                                            <div>
                                                                <label
                                                                    htmlFor={`file-upload-${booking._id}`}
                                                                    className="btn btn-primary btn-sm"
                                                                >
                                                                    Upload Image/Video
                                                                </label>
                                                                <input
                                                                    id={`file-upload-${booking._id}`}
                                                                    type="file"
                                                                    style={{ display: 'none' }}
                                                                    onChange={(e) =>
                                                                        e.target.files &&
                                                                        handleUpload(booking._id, e.target.files[0])
                                                                    }
                                                                />
                                                            </div>
                                                        )}
                                                        {booking.uploadedImage && (
                                                            <div className="mt-2">
                                                                <img
                                                                    src={booking.uploadedImage}
                                                                    alt="Uploaded File"
                                                                    className="img-thumbnail"
                                                                    style={{ width: '100px', height: '100px' }}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
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
