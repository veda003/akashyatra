import React, { useState } from 'react';
import { FaPlane, FaClock, FaSuitcase, FaWifi, FaUtensils, FaChair, FaRupeeSign } from 'react-icons/fa';
import '../styles/FlightCard.css';
import BookingModal from './BookingModal';

const FlightCard = ({ flight, onBookFlight, isAuthenticated, user }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleBookClick = () => {
    if (!isAuthenticated) {
      onBookFlight(flight);
    } else {
      setShowBookingModal(true);
    }
  };

  const handleConfirmBooking = (bookingData) => {
    setShowBookingModal(false);
    onBookFlight({ ...flight, ...bookingData });
  };

  const getStopText = (stops) => {
    if (stops === 0) return 'Non-stop';
    if (stops === 1) return '1 Stop';
    return `${stops} Stops`;
  };

  // Fallback component when image fails to load
  const AirlineLogo = () => {
    if (imageError) {
      return (
        <div 
          className="airline-logo-fallback"
          style={{ backgroundColor: flight.color || '#4a90e2' }}
        >
          {flight.airlineCode}
        </div>
      );
    }
    return (
      <img 
        src={flight.logo} 
        alt={flight.airline} 
        className="airline-logo"
        onError={() => setImageError(true)}
        loading="lazy"
      />
    );
  };

  return (
    <>
      <div className="flight-card">
        <div className="flight-header">
          <AirlineLogo />
          <div className="flight-info">
            <h3>{flight.airline}</h3>
            <p className="flight-number">{flight.flightNumber}</p>
          </div>
          <div className="flight-price">
            <span className="price">
              <FaRupeeSign className="rupee-icon" />
              {flight.price}
            </span>
            <span className="price-label">per person</span>
          </div>
        </div>

        <div className="flight-details">
          <div className="flight-times">
            <div className="time-block">
              <span className="time">{flight.departureTime}</span>
              <span className="location">{flight.fromCode}</span>
              <span className="city-name">{flight.from.split('(')[0].trim()}</span>
            </div>
            
            <div className="duration">
              <FaClock className="duration-icon" />
              <span>{flight.duration}</span>
              <div className="flight-line">
                <FaPlane className="plane-icon" />
              </div>
              <span className="stops-badge">{getStopText(flight.stops)}</span>
            </div>
            
            <div className="time-block">
              <span className="time">{flight.arrivalTime}</span>
              <span className="location">{flight.toCode}</span>
              <span className="city-name">{flight.to.split('(')[0].trim()}</span>
            </div>
          </div>

          <div className="flight-amenities">
            <span className="amenity"><FaSuitcase /> 15kg</span>
            <span className="amenity"><FaWifi /> Wi-Fi</span>
            <span className="amenity"><FaUtensils /> Meal</span>
            <span className="amenity"><FaChair /> Seat</span>
          </div>

          <div className="flight-extra">
            <span className="seats-available">{flight.seatsAvailable} seats available</span>
            <span className="cancellation">Free cancellation</span>
          </div>

          <button className="btn btn-primary select-btn" onClick={handleBookClick}>
            {isAuthenticated ? 'Book Now' : 'Login to Book'}
          </button>
        </div>
      </div>

      {showBookingModal && (
        <BookingModal
          flight={flight}
          user={user}
          onClose={() => setShowBookingModal(false)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </>
  );
};

export default FlightCard;