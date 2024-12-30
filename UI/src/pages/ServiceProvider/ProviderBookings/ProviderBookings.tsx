import { useEffect, useState } from 'react';
import ServiceNavbar from '../ServiceNavbar';
import ServiceSidebar from '../ServiceSidebar';
import axios from '../../../axios/axios';
import { Booking } from '../../../types/booking';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../Redux/store';

function ProviderBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const  Provider=useSelector((state: RootState) => state.user.user);
    console.log('Provider:', Provider);

const providerId=Provider?.id;
const fetchBookings = async () => {
    try {
        const response = await axios.get(`/fetchProviderBookings`, {
            params: { providerId } // Axios automatically appends this as a query string
        });            
            setBookings(response.data.bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
};
    useEffect(() => {
        

        fetchBookings();
    }, []);

    return (
        <div>
            <ServiceNavbar />
            <div className="row">
                <div className="col-md-4">
                    <ServiceSidebar />
                </div>

                <div className="col-md-8">
                    <h2>Provider Bookings</h2>
                    {bookings.length > 0 ? (
                        <ul className="list-group">
                            {bookings.map((booking, index) => (
                                <li key={index} className="list-group-item">
                                    <h5>{booking.customerName}</h5>
                                    <p>Date: {new Date(booking.date).toLocaleDateString()}</p>
                                    <p>Service: {booking.serviceName}</p>
                                    <p>Status: {booking.status}</p>
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
