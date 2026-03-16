import React from 'react';
import { FaPlane, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import '../styles/Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-content">
        <h1 className="hero-title">
          AakashYatri ✈️
        </h1>
        <p className="hero-subtitle">
          Your journey begins here. Book flights across India with ease and style.
        </p>
        
        <div className="hero-stats">
          <div className="stat-item">
            <FaPlane className="stat-icon" />
            <div>
              <h3>500+</h3>
              <p>Daily Flights</p>
            </div>
          </div>
          
          <div className="stat-item">
            <FaMapMarkerAlt className="stat-icon" />
            <div>
              <h3>100+</h3>
              <p>Destinations</p>
            </div>
          </div>
          
          <div className="stat-item">
            <FaCalendarAlt className="stat-icon" />
            <div>
              <h3>24/7</h3>
              <p>Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;