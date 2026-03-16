import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPlane, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = ({ onNavClick }) => {
  const handleLinkClick = (e, section) => {
    e.preventDefault();
    if (onNavClick) {
      onNavClick(section);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleExternalLink = (e, url) => {
    e.preventDefault();
    window.open(url, '_blank');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <FaPlane className="logo-icon" />
              <span>AakashYatri</span>
            </div>
            <p className="footer-description">
              Your wings to the sky! ✈️ Experience seamless travel with India's most beloved flight booking platform.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" onClick={(e) => handleExternalLink(e, 'https://facebook.com')}><FaFacebook /></a>
              <a href="https://twitter.com" onClick={(e) => handleExternalLink(e, 'https://twitter.com')}><FaTwitter /></a>
              <a href="https://instagram.com" onClick={(e) => handleExternalLink(e, 'https://instagram.com')}><FaInstagram /></a>
              <a href="https://linkedin.com" onClick={(e) => handleExternalLink(e, 'https://linkedin.com')}><FaLinkedin /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>🏠 Home</a></li>
              <li><a href="#flights" onClick={(e) => handleLinkClick(e, 'flights-section')}>✈️ Flights</a></li>
              <li><a href="#deals" onClick={(e) => handleLinkClick(e, 'deals')}>🔥 Hot Deals</a></li>
              <li><a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>📖 About Us</a></li>
              <li><a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')}>📞 Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul>
              <li><a href="#help" onClick={(e) => handleLinkClick(e, 'help')}>❓ Help Center</a></li>
              <li><a href="#faq" onClick={(e) => handleLinkClick(e, 'faq')}>📋 FAQ</a></li>
              <li><a href="#terms" onClick={(e) => handleLinkClick(e, 'terms')}>📜 Terms</a></li>
              <li><a href="#privacy" onClick={(e) => handleLinkClick(e, 'privacy')}>🔒 Privacy</a></li>
              <li><a href="#cookies" onClick={(e) => handleLinkClick(e, 'cookies')}>🍪 Cookies</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="contact-info">
              <li>
                <FaMapMarkerAlt className="contact-icon" />
                <span>123 Aviation Blvd, New Delhi, India</span>
              </li>
              <li>
                <FaPhone className="contact-icon" />
                <span>
                  <a href="tel:+916381241431">+91 6381241431</a>
                </span>
              </li>
              <li>
                <FaEnvelope className="contact-icon" />
                <span>
                  <a href="mailto:vedagiri003@gmail.com">vedagiri003@gmail.com</a>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 AakashYatri. All rights reserved. | Fly high, fly safe! ✨</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;