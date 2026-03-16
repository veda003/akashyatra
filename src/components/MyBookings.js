import React from 'react';
import { FaTimes, FaPlane, FaCalendarAlt, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import '../styles/MyBookings.css';

const MyBookings = ({ bookings, onClose }) => {
  const getStatusClass = (status) => {
    switch(status) {
      case 'Confirmed':
        return 'status-confirmed';
      case 'Cancelled':
        return 'status-cancelled';
      case 'Completed':
        return 'status-completed';
      default:
        return '';
    }
  };

  const downloadTicket = (booking) => {
    const ticketContent = `
      AAKASHYATRI - YOUR DIGITAL BOARDING PASS
      =========================================
      Booking ID: ${booking.id}
      Date: ${new Date(booking.bookingDate).toLocaleDateString()}
      
      FLIGHT DETAILS
      --------------
      Airline: ${booking.airline} (${booking.flightNumber})
      From: ${booking.from}
      To: ${booking.to}
      Departure: ${booking.departureTime}
      Arrival: ${booking.arrivalTime}
      Duration: ${booking.duration}
      
      PASSENGER DETAILS
      -----------------
      ${booking.passengers ? booking.passengers.map(p => `Name: ${p.name}, Age: ${p.age}, Gender: ${p.gender}`).join('\n') : 'Not specified'}
      
      PAYMENT DETAILS
      ---------------
      Total Amount: ₹${booking.totalAmount || booking.price}
      Status: ${booking.status}
      
      Thank you for choosing AakashYatri! ✈️
      Have a pleasant journey!
    `;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aakashyatri-ticket-${booking.id}.txt`;
    a.click();
  };

  return (
    <div className="my-bookings-overlay">
      <div className="my-bookings-modal">
        <div className="bookings-header">
          <h2>My Journey Log ✈️</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="bookings-list">
          {bookings.length === 0 ? (
            <div className="no-bookings">
              <FaPlane className="no-bookings-icon" />
              <p>No journeys yet. Time to spread your wings!</p>
              <button className="btn btn-primary" onClick={onClose}>Book Your First Flight</button>
            </div>
          ) : (
            bookings.map((booking, index) => (
              <div key={index} className="booking-card">
                <div className="booking-header">
                  <span className="booking-id">Booking ID: {booking.id}</span>
                  <span className={`booking-status ${getStatusClass(booking.status)}`}>
                    {booking.status} ✓
                  </span>
                </div>

                <div className="booking-details">
                  <div className="route-info">
                    <div className="from-to">
                      <span className="city">{booking.from}</span>
                      <FaPlane className="plane-icon" />
                      <span className="city">{booking.to}</span>
                    </div>
                    <div className="flight-info">
                      <span className="airline">{booking.airline} - {booking.flightNumber}</span>
                      <span className="time">{booking.departureTime} → {booking.arrivalTime}</span>
                      <span className="duration">{booking.duration}</span>
                    </div>
                  </div>

                  <div className="booking-meta">
                    <div className="meta-item">
                      <FaCalendarAlt />
                      <span>Booked: {new Date(booking.bookingDate).toLocaleDateString()}</span>
                    </div>
                    <div className="meta-item">
                      <FaMapMarkerAlt />
                      <span>Travel Date: {booking.date}</span>
                    </div>
                  </div>

                  <div className="booking-footer">
                    <div className="price">
                      <span>Total Paid:</span>
                      <strong>₹{booking.totalAmount || booking.price}</strong>
                    </div>
                    <button 
                      className="btn btn-download"
                      onClick={() => downloadTicket(booking)}
                    >
                      <FaDownload /> Download Boarding Pass
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;