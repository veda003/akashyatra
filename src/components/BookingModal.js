import React, { useState } from 'react';
import { FaTimes, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import '../styles/BookingModal.css';

const BookingModal = ({ flight, onClose, onConfirm, user }) => {
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState([{
    name: user?.name || '',
    age: '',
    gender: 'male'
  }]);
  const [contactDetails, setContactDetails] = useState({
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const addPassenger = () => {
    if (passengers.length < 5) {
      setPassengers([...passengers, { name: '', age: '', gender: 'male' }]);
    }
  };

  const removePassenger = (index) => {
    if (passengers.length > 1) {
      setPassengers(passengers.filter((_, i) => i !== index));
    }
  };

  const updatePassenger = (index, field, value) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index][field] = value;
    setPassengers(updatedPassengers);
  };

  const handleContactChange = (e) => {
    setContactDetails({
      ...contactDetails,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = () => {
    return flight.price * passengers.length;
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleConfirm = () => {
    const bookingData = {
      flight,
      passengers,
      contactDetails,
      totalAmount: calculateTotal(),
      bookingDate: new Date().toISOString()
    };
    onConfirm(bookingData);
    onClose();
  };

  return (
    <div className="booking-modal-overlay">
      <div className="booking-modal">
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="booking-header">
          <h2>Complete Your Booking</h2>
          <div className="booking-steps">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <span className="step-number">1</span>
              <span className="step-label">Passengers</span>
            </div>
            <div className={`step ${step >= 2 ? 'active' : ''}`}>
              <span className="step-number">2</span>
              <span className="step-label">Contact</span>
            </div>
            <div className={`step ${step >= 3 ? 'active' : ''}`}>
              <span className="step-number">3</span>
              <span className="step-label">Confirm</span>
            </div>
          </div>
        </div>

        <div className="flight-summary">
          <div className="route">
            <span className="city">{flight.from}</span>
            <span className="arrow">→</span>
            <span className="city">{flight.to}</span>
          </div>
          <div className="details">
            <span>{flight.airline} - {flight.flightNumber}</span>
            <span>{flight.departureTime} - {flight.arrivalTime}</span>
            <span>Duration: {flight.duration}</span>
          </div>
        </div>

        {step === 1 && (
          <div className="step-content">
            <h3>Passenger Details</h3>
            {passengers.map((passenger, index) => (
              <div key={index} className="passenger-form">
                <h4>Passenger {index + 1}</h4>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={passenger.name}
                    onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={passenger.age}
                    onChange={(e) => updatePassenger(index, 'age', e.target.value)}
                    required
                  />
                  <select
                    value={passenger.gender}
                    onChange={(e) => updatePassenger(index, 'gender', e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {passengers.length > 1 && (
                    <button type="button" className="remove-btn" onClick={() => removePassenger(index)}>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            
            {passengers.length < 5 && (
              <button type="button" className="add-passenger-btn" onClick={addPassenger}>
                + Add Another Passenger
              </button>
            )}

            <div className="step-actions">
              <button className="btn btn-primary" onClick={handleNext}>
                Continue to Contact Details
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h3>Contact Information</h3>
            <div className="contact-form">
              <div className="form-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={contactDetails.email}
                  onChange={handleContactChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <FaPhone className="input-icon" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={contactDetails.phone}
                  onChange={handleContactChange}
                  required
                />
              </div>
            </div>

            <div className="step-actions">
              <button className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleNext}>
                Review Booking
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h3>Review Your Booking</h3>
            
            <div className="review-section">
              <h4>Passenger Details</h4>
              {passengers.map((passenger, index) => (
                <div key={index} className="review-item">
                  <p><strong>Passenger {index + 1}:</strong> {passenger.name}, Age: {passenger.age}, Gender: {passenger.gender}</p>
                </div>
              ))}
            </div>

            <div className="review-section">
              <h4>Contact Information</h4>
              <p><strong>Email:</strong> {contactDetails.email}</p>
              <p><strong>Phone:</strong> {contactDetails.phone}</p>
            </div>

            <div className="price-breakup">
              <h4>Price Breakup</h4>
              <div className="price-item">
                <span>Base Fare ({passengers.length} Passenger{passengers.length > 1 ? 's' : ''})</span>
                <span>₹{calculateTotal()}</span>
              </div>
              <div className="price-item total">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>

            <div className="step-actions">
              <button className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
              <button className="btn btn-primary" onClick={handleConfirm}>
                Confirm Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;