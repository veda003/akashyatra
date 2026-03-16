import React, { useState } from 'react';
import { FaPlane, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTicketAlt } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated, user, onLoginClick, onSignupClick, onLogout, onMyBookingsClick, onNavClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (section) => {
    onNavClick(section);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <FaPlane className="logo-icon" />
          <span>AakashYatri ✈️</span>
        </div>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <ul className="nav-list">
            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>Home</a></li>
            <li><a href="#flights" onClick={(e) => { e.preventDefault(); handleNavClick('flights-section'); }}>Flights</a></li>
            <li><a href="#deals" onClick={(e) => { e.preventDefault(); handleNavClick('deals'); }}>Hot Deals</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}>Contact</a></li>
          </ul>
          
          <div className="nav-buttons">
            {isAuthenticated ? (
              <>
                <span className="user-welcome">
                  <FaUser /> {user?.name || 'Traveler'}
                </span>
                <button className="btn btn-icon" onClick={onMyBookingsClick}>
                  <FaTicketAlt /> My Trips
                </button>
                <button className="btn btn-logout" onClick={onLogout}>
                  <FaSignOutAlt /> Exit
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-login" onClick={onLoginClick}>
                  Sign In
                </button>
                <button className="btn btn-signup" onClick={onSignupClick}>
                  Join Free
                </button>
              </>
            )}
          </div>
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;