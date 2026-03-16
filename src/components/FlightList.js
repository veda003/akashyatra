import React from 'react';
import FlightCard from './FlightCard';
import '../styles/FlightList.css';

const FlightList = ({ flights, onBookFlight, isAuthenticated, user }) => {
  return (
    <div className="flight-list">
      <h2 className="flight-list-title">Available Flights</h2>
      <p className="flight-list-subtitle">{flights.length} flights found</p>
      
      <div className="filters">
        <select className="filter-select">
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Price (High to Low)</option>
          <option>Sort by: Duration</option>
          <option>Sort by: Departure Time</option>
        </select>
        
        <select className="filter-select">
          <option>Stops: Any</option>
          <option>Non-stop only</option>
          <option>1 Stop</option>
          <option>2+ Stops</option>
        </select>
      </div>

      <div className="flights-grid">
        {flights.map(flight => (
          <FlightCard 
            key={flight.id} 
            flight={flight} 
            onBookFlight={onBookFlight}
            isAuthenticated={isAuthenticated}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default FlightList;